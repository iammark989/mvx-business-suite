import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEvent } from 'react';

type Category = {
    id: number;
    code: string;
    name: string;
    parent_id: number | null;
};

type Brand = {
    id: number;
    name: string;
};

type Uom = {
    id: number;
    code: string;
    name: string;
    measurement_type: string;
};

type PriceType = {
    id: number;
    code: string;
    name: string;
};

type PageProps = {
    auth: {
        permissions: string[];
    };
    categories: Category[];
    brands: Brand[];
    uoms: Uom[];
    priceTypes: PriceType[];
};

type PriceEntry = {
    price_type_id: number;
    price: string;
};

export default function Create() {
    const { auth, categories, brands, uoms, priceTypes } =
        usePage<PageProps>().props;

    const canManagePrices = auth.permissions.includes('items.manage-prices');

    const { data, setData, post, transform, processing, errors } = useForm({
        item_number: '',
        description: '',
        short_description: '',
        category_id: '',
        brand_id: '',
        purchase_uom_id: '',
        selling_uom_id: '',
        purchase_qty: '1',
        selling_qty: '1',
        weight: '',
        weight_uom_id: '',
        tax_classification: 'VAT',
        prices: priceTypes.map((priceType) => ({
            price_type_id: priceType.id,
            price: '',
        })) as PriceEntry[],
    });

    const selectedPurchaseUom = uoms.find(
        (uom) => String(uom.id) === data.purchase_uom_id,
    );

    const selectedSellingUom = uoms.find(
        (uom) => String(uom.id) === data.selling_uom_id,
    );

    const sellingUomOptions = selectedPurchaseUom
        ? uoms.filter(
              (uom) =>
                  uom.measurement_type ===
                  selectedPurchaseUom.measurement_type,
          )
        : uoms;

    const weightUomOptions = uoms.filter(
        (uom) => uom.measurement_type === 'weight',
    );

    function handlePurchaseUomChange(value: string) {
    const purchaseUom = uoms.find(
        (uom) => String(uom.id) === value,
    );

    const currentSellingUom = uoms.find(
        (uom) => String(uom.id) === data.selling_uom_id,
    );

    setData((previous) => {
        const keepSellingUom =
            currentSellingUom &&
            purchaseUom &&
            currentSellingUom.measurement_type ===
                purchaseUom.measurement_type;

        const sellingUomId = keepSellingUom
            ? previous.selling_uom_id
            : '';

        return {
            ...previous,
            purchase_uom_id: value,
            selling_uom_id: sellingUomId,
            selling_qty:
                sellingUomId === value
                    ? previous.purchase_qty
                    : previous.selling_qty,
        };
    });
}

function handleSellingUomChange(value: string) {
    setData((previous) => ({
        ...previous,
        selling_uom_id: value,
        selling_qty:
            previous.purchase_uom_id === value
                ? previous.purchase_qty
                : previous.selling_qty,
    }));
}

function handlePurchaseQtyChange(value: string) {
    setData((previous) => ({
        ...previous,
        purchase_qty: value,
        selling_qty:
            previous.purchase_uom_id === previous.selling_uom_id
                ? value
                : previous.selling_qty,
    }));
}

function handleSellingQtyChange(value: string) {
    setData((previous) => ({
        ...previous,
        selling_qty: value,
        purchase_qty:
            previous.purchase_uom_id === previous.selling_uom_id
                ? value
                : previous.purchase_qty,
    }));
}

    function handlePriceChange(priceTypeId: number, value: string) {
        setData(
            'prices',
            data.prices.map((price) =>
                price.price_type_id === priceTypeId
                    ? { ...price, price: value }
                    : price,
            ),
        );
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        transform((formData) => ({
            ...formData,
            prices: canManagePrices
                ? formData.prices.filter(
                    (price) => price.price.trim() !== '',
                )
                : [],
        }));

        post('/admin/items');
    }

    const inputClass =
        'h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary';

    const selectClass =
        'h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary';

    const labelClass = 'mb-2 block text-sm font-medium';

    function renderError(field: string) {
        const message = errors[field as keyof typeof errors];

        return message ? (
            <p className="mt-1 text-sm text-destructive">{message}</p>
        ) : null;
    }

    return (
        <>
            <Head title="Create Item" />

            <div className="space-y-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Create Item
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Add a new item to your inventory master list.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-5xl space-y-6">
                    {/* Basic Information */}
                    <div className="rounded-xl border bg-card p-6">
                        <div className="mb-6">
                            <h2 className="font-semibold">
                                Basic Information
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Enter the item's identification and description.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label htmlFor="item_number" className={labelClass}>
                                    Item Number
                                </label>
                                <input
                                    id="item_number"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={7}
                                    value={data.item_number}
                                    onChange={(event) =>
                                        setData(
                                            'item_number',
                                            event.target.value
                                                .replace(/\D/g, '')
                                                .slice(0, 7),
                                        )
                                    }
                                    required
                                    autoComplete="off"
                                    className={inputClass}
                                    placeholder="7-digit item number"
                                />
                                {renderError('item_number')}
                            </div>

                            <div>
                                <label htmlFor="description" className={labelClass}>
                                    Item Description
                                </label>
                                <input
                                    id="description"
                                    type="text"
                                    value={data.description}
                                    onChange={(event) =>
                                        setData('description', event.target.value)
                                    }
                                    required
                                    maxLength={255}
                                    className={inputClass}
                                    placeholder="Enter full item description"
                                />
                                {renderError('description')}
                            </div>

                            <div className="md:col-span-2">
                                <label
                                    htmlFor="short_description"
                                    className={labelClass}
                                >
                                    Short Description
                                    <span className="ml-1 font-normal text-muted-foreground">
                                        (Optional)
                                    </span>
                                </label>
                                <input
                                    id="short_description"
                                    type="text"
                                    value={data.short_description}
                                    onChange={(event) =>
                                        setData(
                                            'short_description',
                                            event.target.value,
                                        )
                                    }
                                    maxLength={100}
                                    className={inputClass}
                                    placeholder="Short description for invoices and receipts"
                                />
                                {renderError('short_description')}
                            </div>
                        </div>
                    </div>

                    {/* Classification */}
                    <div className="rounded-xl border bg-card p-6">
                        <div className="mb-6">
                            <h2 className="font-semibold">Classification</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Assign the item to a category, brand, and tax classification.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label htmlFor="category_id" className={labelClass}>
                                    Category
                                </label>
                                <select
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={(event) =>
                                        setData('category_id', event.target.value)
                                    }
                                    required
                                    className={selectClass}
                                >
                                    <option value="">Select category</option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.code} - {category.name}
                                        </option>
                                    ))}
                                </select>
                                {renderError('category_id')}
                            </div>

                            <div>
                                <label htmlFor="brand_id" className={labelClass}>
                                    Brand
                                    <span className="ml-1 font-normal text-muted-foreground">
                                        (Optional)
                                    </span>
                                </label>
                                <select
                                    id="brand_id"
                                    value={data.brand_id}
                                    onChange={(event) =>
                                        setData('brand_id', event.target.value)
                                    }
                                    className={selectClass}
                                >
                                    <option value="">No brand</option>
                                    {brands.map((brand) => (
                                        <option key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                                {renderError('brand_id')}
                            </div>

                            <div>
                                <label
                                    htmlFor="tax_classification"
                                    className={labelClass}
                                >
                                    Tax Classification
                                </label>
                                <select
                                    id="tax_classification"
                                    value={data.tax_classification}
                                    onChange={(event) =>
                                        setData(
                                            'tax_classification',
                                            event.target.value,
                                        )
                                    }
                                    required
                                    className={selectClass}
                                >
                                    <option value="VAT">VAT</option>
                                    <option value="VAT-EX">VAT Exempt</option>
                                    <option value="ZERO">Zero Rated</option>
                                    <option value="NON-VAT">Non-VAT</option>
                                </select>
                                {renderError('tax_classification')}
                            </div>
                        </div>
                    </div>

                    {/* Units of Measure */}
                    <div className="rounded-xl border bg-card p-6">
                        <div className="mb-6">
                            <h2 className="font-semibold">Units of Measure</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Configure purchasing and selling units and their conversion.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                        {/* Purchase UOM */}
                        <div>
                            <label htmlFor="purchase_uom_id" className={labelClass}>
                                Purchase UOM
                            </label>

                            <select
                                id="purchase_uom_id"
                                value={data.purchase_uom_id}
                                onChange={(event) =>
                                    handlePurchaseUomChange(event.target.value)
                                }
                                required
                                className={selectClass}
                            >
                                <option value="">Select purchase UOM</option>

                                {uoms.map((uom) => (
                                    <option key={uom.id} value={uom.id}>
                                        {uom.code} - {uom.name}
                                    </option>
                                ))}
                            </select>

                            {renderError('purchase_uom_id')}
                        </div>

                        {/* Purchase Quantity */}
                        <div>
                            <label htmlFor="purchase_qty" className={labelClass}>
                                Purchase Quantity
                            </label>

                            <input
                                id="purchase_qty"
                                type="number"
                                min="0.0001"
                                step="0.0001"
                                value={data.purchase_qty}
                                onChange={(event) =>
                                    handlePurchaseQtyChange(event.target.value)
                                }
                                required
                                className={inputClass}
                                placeholder="Enter purchase quantity"
                            />

                            {renderError('purchase_qty')}
                        </div>

                        {/* Selling UOM */}
                        <div>
                            <label htmlFor="selling_uom_id" className={labelClass}>
                                Selling UOM
                            </label>

                            <select
                                id="selling_uom_id"
                                value={data.selling_uom_id}
                                onChange={(event) =>
                                    handleSellingUomChange(event.target.value)
                                }
                                required
                                disabled={!data.purchase_uom_id}
                                className={selectClass}
                            >
                                <option value="">Select selling UOM</option>

                                {sellingUomOptions.map((uom) => (
                                    <option key={uom.id} value={uom.id}>
                                        {uom.code} - {uom.name}
                                    </option>
                                ))}
                            </select>

                            {renderError('selling_uom_id')}
                        </div>

                        {/* Selling Quantity */}
                        <div>
                            <label htmlFor="selling_qty" className={labelClass}>
                                Selling Quantity
                            </label>

                            <input
                                id="selling_qty"
                                type="number"
                                min="0.0001"
                                step="0.0001"
                                value={data.selling_qty}
                                onChange={(event) =>
                                    handleSellingQtyChange(event.target.value)
                                }
                                required
                                className={inputClass}
                                placeholder="Enter selling quantity"
                            />

                            {renderError('selling_qty')}
                        </div>

                        {/* Conversion Summary */}
                        <div className="md:col-span-2 rounded-lg border bg-muted/40 p-4">
                            <p className="text-sm font-medium">
                                UOM Conversion
                            </p>

                            {selectedPurchaseUom && selectedSellingUom ? (
                                <p className="mt-2 text-lg font-semibold">
                                    {data.purchase_qty || '0'}{' '}
                                    {selectedPurchaseUom.code}
                                    {' = '}
                                    {data.selling_qty || '0'}{' '}
                                    {selectedSellingUom.code}
                                </p>
                            ) : (
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Select both purchase and selling UOM to see the conversion.
                                </p>
                            )}

                            <p className="mt-1 text-xs text-muted-foreground">
                                Define how many selling units correspond to the specified
                                purchase quantity.
                            </p>
                        </div>
                    </div>
                    </div>

                    {/* Weight */}
                    <div className="rounded-xl border bg-card p-6">
                        <div className="mb-6">
                            <h2 className="font-semibold">Weight Information</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Weight is optional. Provide both fields if applicable.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label htmlFor="weight" className={labelClass}>
                                    Weight
                                    <span className="ml-1 font-normal text-muted-foreground">
                                        (Optional)
                                    </span>
                                </label>
                                <input
                                    id="weight"
                                    type="number"
                                    min="0.0001"
                                    step="0.0001"
                                    value={data.weight}
                                    onChange={(event) =>
                                        setData('weight', event.target.value)
                                    }
                                    className={inputClass}
                                    placeholder="Enter item weight"
                                />
                                {renderError('weight')}
                            </div>

                            <div>
                                <label
                                    htmlFor="weight_uom_id"
                                    className={labelClass}
                                >
                                    Weight UOM
                                </label>
                                <select
                                    id="weight_uom_id"
                                    value={data.weight_uom_id}
                                    onChange={(event) =>
                                        setData('weight_uom_id', event.target.value)
                                    }
                                    className={selectClass}
                                >
                                    <option value="">Select weight UOM</option>
                                    {weightUomOptions.map((uom) => (
                                        <option key={uom.id} value={uom.id}>
                                            {uom.code} - {uom.name}
                                        </option>
                                    ))}
                                </select>
                                {renderError('weight_uom_id')}
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    {canManagePrices && (
                        <div className="rounded-xl border bg-card p-6">
                            <div className="mb-6">
                                <h2 className="font-semibold">Item Pricing</h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Enter prices per selling UOM. Leave a price blank if it is not yet configured.
                                </p>
                            </div>

                            {priceTypes.length > 0 ? (
                                <div className="grid gap-5 md:grid-cols-2">
                                    {priceTypes.map((priceType, index) => (
                                        <div key={priceType.id}>
                                            <label
                                                htmlFor={`price-${priceType.id}`}
                                                className={labelClass}
                                            >
                                                {priceType.name}
                                                <span className="ml-1 text-xs font-normal text-muted-foreground">
                                                    ({priceType.code})
                                                </span>
                                            </label>
                                            <input
                                                id={`price-${priceType.id}`}
                                                type="number"
                                                min="0"
                                                step="0.0001"
                                                value={
                                                    data.prices.find(
                                                        (price) =>
                                                            price.price_type_id ===
                                                            priceType.id,
                                                    )?.price ?? ''
                                                }
                                                onChange={(event) =>
                                                    handlePriceChange(
                                                        priceType.id,
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                                placeholder="Enter price"
                                            />
                                            {renderError(`prices.${index}.price`)}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    No active price types are available.
                                </p>
                            )}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Link
                            href="/admin/items"
                            className="inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium hover:bg-muted"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing ? 'Creating...' : 'Create Item'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        {
            title: 'Items',
            href: '/admin/items',
        },
        {
            title: 'Create Item',
            href: '/admin/items/create',
        },
    ],
};