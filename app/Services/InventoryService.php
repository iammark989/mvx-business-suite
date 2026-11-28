<?php

namespace App\Services;

use App\Models\InventoryStock;
use App\Models\InventoryTransaction;
use App\Models\Item;
use App\Models\Warehouse;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class InventoryService
{
    /**
     * Record a stock movement and update the inventory balance.
     *
     * All quantities must use the item's base selling UOM.
     */
    public function recordMovement(
        int $itemId,
        int $warehouseId,
        string $transactionType,
        string $direction,
        string $quantity,
        ?string $referenceNumber = null,
        ?int $createdBy = null,
        ?string $remarks = null,
        ?string $transactionDate = null,
    ): InventoryTransaction {
        $movementTypes = [
            'OPENING' => 'IN',
            'RECEIPT' => 'IN',
            'SALE' => 'OUT',
            'ADJUSTMENT_IN' => 'IN',
            'ADJUSTMENT_OUT' => 'OUT',
            'TRANSFER_IN' => 'IN',
            'TRANSFER_OUT' => 'OUT',
        ];

        $transactionType = strtoupper($transactionType);
        $direction = strtoupper($direction);

        if (! isset($movementTypes[$transactionType])) {
            throw ValidationException::withMessages([
                'transaction_type' => 'Invalid inventory transaction type.',
            ]);
        }

        if ($movementTypes[$transactionType] !== $direction) {
            throw ValidationException::withMessages([
                'direction' => 'The movement direction does not match the transaction type.',
            ]);
        }

        $quantityInScaled = $this->toScaledQuantity($quantity);

        if ($quantityInScaled <= 0) {
            throw ValidationException::withMessages([
                'quantity' => 'The movement quantity must be greater than zero.',
            ]);
        }

        return DB::transaction(function () use (
            $itemId,
            $warehouseId,
            $transactionType,
            $direction,
            $quantity,
            $quantityInScaled,
            $referenceNumber,
            $createdBy,
            $remarks,
            $transactionDate,
        ) {
            // Lock the item to serialize movements for this item,
            // including when its stock record does not exist yet.
            $item = Item::query()
                ->lockForUpdate()
                ->findOrFail($itemId);

            Warehouse::query()->findOrFail($warehouseId);

            // Create the stock record if this is the item's first movement
            // in this warehouse.
            InventoryStock::query()->firstOrCreate(
                [
                    'item_id' => $item->id,
                    'warehouse_id' => $warehouseId,
                ],
                [
                    'quantity' => 0,
                ]
            );

            $stock = InventoryStock::query()
                ->where('item_id', $item->id)
                ->where('warehouse_id', $warehouseId)
                ->lockForUpdate()
                ->firstOrFail();

            $currentBalance = $this->toScaledQuantity(
                (string) $stock->quantity
            );

            if (
                $direction === 'OUT'
                && $quantityInScaled > $currentBalance
            ) {
                throw ValidationException::withMessages([
                    'quantity' => 'Insufficient stock. The available quantity is '
                        . $stock->quantity . '.',
                ]);
            }

            $newBalance = $direction === 'IN'
                ? $currentBalance + $quantityInScaled
                : $currentBalance - $quantityInScaled;

            if ($newBalance < 0 || $newBalance > 999999999999999) {
                throw ValidationException::withMessages([
                    'quantity' => 'The resulting stock balance is outside the allowed range.',
                ]);
            }

            $stock->update([
                'quantity' => $this->fromScaledQuantity($newBalance),
            ]);

            return InventoryTransaction::query()->create([
                'item_id' => $item->id,
                'warehouse_id' => $warehouseId,
                'transaction_type' => $transactionType,
                'reference_number' => $referenceNumber,
                'quantity_in' => $direction === 'IN'
                    ? $quantity
                    : 0,
                'quantity_out' => $direction === 'OUT'
                    ? $quantity
                    : 0,
                'balance_after' => $this->fromScaledQuantity($newBalance),
                'transaction_date' => $transactionDate
                    ? Carbon::parse($transactionDate)
                    : now(),
                'created_by' => $createdBy,
                'remarks' => $remarks,
            ]);
        }, 3);
    }

    /**
     * Convert a decimal quantity into an integer scaled by 10,000.
     */
    private function toScaledQuantity(string $quantity): int
    {
        $quantity = trim($quantity);

        if (! preg_match('/^\d{1,11}(\.\d{1,4})?$/', $quantity)) {
            throw ValidationException::withMessages([
                'quantity' => 'Quantity must be a valid positive number with up to four decimal places.',
            ]);
        }

        [$whole, $decimal] = array_pad(
            explode('.', $quantity, 2),
            2,
            ''
        );

        $scaled = (int) $whole * 10000
            + (int) str_pad($decimal, 4, '0');

        return $scaled;
    }

    /**
     * Convert a scaled integer back into a four-decimal string.
     */
    private function fromScaledQuantity(int $quantity): string
    {
        return sprintf(
            '%d.%04d',
            intdiv($quantity, 10000),
            $quantity % 10000
        );
    }
}