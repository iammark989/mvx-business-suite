import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';

type Category = {
    id: number;
    code: string;
    name: string;
    parent_id: number | null;
    is_active?: boolean;
};

type Brand = {
    id: number;
    name: string;
    is_active?: boolean;
};

type Supplier = {
    id: number;
    code: string;
    name: string;
    is_active?: boolean;
};

type Uom = {
    id: number;
    code: string;
    name: string;
    measurement_type: string;
    is_active?: boolean;
};

type PriceType = {
    id: number;
    code: string;
    name: string;
    is_active?: boolean;
};

type ExistingPrice = {
    id: number;
    price_type_id: number;
    price: string | number;
    price_type?: PriceType;
};

type Item = {
    id: number;
    item_number: string;
    description: string;
    image: string | null;
    short_description: string | null;
    category_id: number;
    brand_id: number | null;
    default_supplier_id: number | null;
    purchase_uom_id: number;
    selling_uom_id: number;
    purchase_qty: string | number;
    selling_qty: string | number;
    weight_grams: string | number | null;
    tax_classification: string;
    is_active: boolean;
    prices: ExistingPrice[];
};

type PageProps = {
    auth: {
        permissions: string[];
    };
    item: Item;
    categories: Category[];
    suppliers: Supplier[];
    brands: Brand[];
    uoms: Uom[];
    priceTypes: PriceType[];
};

type PriceEntry = {
    price_type_id: number;
    price: string;
};

export default function Edit() {
    const {
        auth,
        item,
        categories,
        brands,
        suppliers,
        uoms,
        priceTypes,
    } = usePage<PageProps>().props;

    const canManagePrices = auth.permissions.includes('items.manage-prices');

    const { data, setData, post, transform, processing, errors } = useForm({
        item_number: item.item_number,
        description: item.description,
        image: null as File | null,
        remove_image: false,
        short_description: item.short_description ?? '',
        category_id: String(item.category_id),
        brand_id: item.brand_id ? String(item.brand_id) : '',
        default_supplier_id: item.default_supplier_id
        ? String(item.default_supplier_id)
        : '',
        purchase_uom_id: String(item.purchase_uom_id),
        selling_uom_id: String(item.selling_uom_id),
        purchase_qty: String(item.purchase_qty),
        selling_qty: String(item.selling_qty),
        weight_grams: String(item.weight_grams ?? 0),
        tax_classification: item.tax_classification,
        prices: priceTypes.map((priceType) => {
            const existingPrice = item.prices.find(
                (price) => price.price_type_id === priceType.id,
            );

            return {
                price_type_id: priceType.id,
                price: existingPrice ? String(existingPrice.price) : '',
            };
        }) as PriceEntry[],
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [removeExistingImage, setRemoveExistingImage] = useState(false);

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

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

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        transform((formData) => ({
            ...formData,
            _method: 'put',
            prices: canManagePrices
                ? formData.prices.filter(
                    (price) => price.price.trim() !== '',
                )
                : [],
        }));

        post(`/admin/items/${item.id}`);
    }

    function handleImageChange(file: File | null) {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }

        setData((previous) => ({
            ...previous,
            image: file,
            remove_image: false,
        }));

        setImagePreview(file ? URL.createObjectURL(file) : null);
        setRemoveExistingImage(false);
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
            <Head title={`Edit Item - ${item.item_number}`} />

            <div className="space-y-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Edit Item
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Update the information for item {item.item_number}.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-5xl space-y-6"
                >
                    {/* Basic Information */}
                    <div className="rounded-xl border bg-card p-6">
                        <div className="mb-6">
                            <h2 className="font-semibold">
                                Basic Information
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Update the item's identification and description.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="item_number"
                                    className={labelClass}
                                >
                                    Item Number
                                </label>
                                <input
                                    id="item_number"
                                    type="text"
                                    value={data.item_number}
                                    disabled
                                    className={`${inputClass} cursor-not-allowed bg-muted text-muted-foreground`}
                                />
                                {renderError('item_number')}
                            </div>

                            <div>
                                <label
                                    htmlFor="description"
                                    className={labelClass}
                                >
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

                            <div className="md:col-span-2">
                                <label htmlFor="image" className={labelClass}>
                                    Item Image
                                    <span className="ml-1 font-normal text-muted-foreground">
                                        (Optional)
                                    </span>
                                </label>

                                {(imagePreview || (item.image && !removeExistingImage)) && (
                                    <div className="mb-3">
                                        <img
                                            src={
                                                imagePreview ??
                                                `/storage/${item.image}`
                                            }
                                            alt="Item preview"
                                            className="h-40 w-40 rounded-lg border object-cover"
                                        />
                                    </div>
                                )}

                                <input
                                    id="image"
                                    type="file"
                                    accept=".jpg,.jpeg,.png,.webp"
                                    onChange={(event) =>
                                        handleImageChange(event.target.files?.[0] ?? null)
                                    }
                                    className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-muted file:px-4 file:py-2 file:text-sm file:font-medium"
                                />

                                <p className="mt-2 text-xs text-muted-foreground">
                                    Accepted formats: JPG, JPEG, PNG, WEBP. Maximum file size: 2MB.
                                </p>

                                {renderError('image')}

                                {(imagePreview || (item.image && !removeExistingImage)) && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (imagePreview) {
                                                handleImageChange(null);
                                            } else {
                                                setRemoveExistingImage(true);
                                                setData('remove_image', true);
                                            }

                                            const input = document.getElementById(
                                                'image',
                                            ) as HTMLInputElement | null;

                                            if (input) {
                                                input.value = '';
                                            }
                                        }}
                                        className="mt-3 text-sm font-medium text-destructive hover:underline"
                                    >
                                        Remove Image
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/** Supplier */}
                    <div>
                        <label
                            htmlFor="default_supplier_id"
                            className={labelClass}
                        >
                            Default Supplier
                            <span className="ml-1 font-normal text-muted-foreground">
                                (Optional)
                            </span>
                        </label>

                        <select
                            id="default_supplier_id"
                            value={data.default_supplier_id}
                            onChange={(event) =>
                                setData('default_supplier_id', event.target.value)
                            }
                            className={selectClass}
                        >
                            <option value="">No default supplier</option>

                            {suppliers.map((supplier) => (
                                <option key={supplier.id} value={supplier.id}>
                                    {supplier.code} - {supplier.name}
                                    {supplier.is_active === false ? ' (Inactive)' : ''}
                                </option>
                            ))}
                        </select>

                        {renderError('default_supplier_id')}
                    </div>                    

                    {/* Classification */}
                    <div className="rounded-xl border bg-card p-6">
                        <div className="mb-6">
                            <h2 className="font-semibold">
                                Classification
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Assign the item to a category, brand, and tax classification.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="category_id"
                                    className={labelClass}
                                >
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
                                            {category.is_active === false
                                                ? ' (Inactive)'
                                                : ''}
                                        </option>
                                    ))}
                                </select>
                                {renderError('category_id')}
                            </div>

                            <div>
                                <label
                                    htmlFor="brand_id"
                                    className={labelClass}
                                >
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
                                        <option
                                            key={brand.id}
                                            value={brand.id}
                                        >
                                            {brand.name}
                                            {brand.is_active === false
                                                ? ' (Inactive)'
                                                : ''}
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
                            <h2 className="font-semibold">
                                Units of Measure
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Enter the equivalent quantities for the purchase and selling units.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            {/* Purchase UOM */}
                            <div>
                                <label
                                    htmlFor="purchase_uom_id"
                                    className={labelClass}
                                >
                                    Purchase UOM
                                </label>

                                <select
                                    id="purchase_uom_id"
                                    value={data.purchase_uom_id}
                                    onChange={(event) =>
                                        handlePurchaseUomChange(
                                            event.target.value,
                                        )
                                    }
                                    required
                                    className={selectClass}
                                >
                                    <option value="">
                                        Select purchase UOM
                                    </option>

                                    {uoms.map((uom) => (
                                        <option
                                            key={uom.id}
                                            value={uom.id}
                                        >
                                            {uom.code} - {uom.name}
                                            {uom.is_active === false
                                                ? ' (Inactive)'
                                                : ''}
                                        </option>
                                    ))}
                                </select>

                                {renderError('purchase_uom_id')}
                            </div>

                            {/* Purchase Quantity */}
                            <div>
                                <label
                                    htmlFor="purchase_qty"
                                    className={labelClass}
                                >
                                    Quantity of Purchase UOM
                                </label>

                                <input
                                    id="purchase_qty"
                                    type="number"
                                    min="0.0001"
                                    step="0.0001"
                                    value={data.purchase_qty}
                                    onChange={(event) =>
                                        handlePurchaseQtyChange(
                                            event.target.value,
                                        )
                                    }
                                    required
                                    className={inputClass}
                                    placeholder="Enter purchase quantity"
                                />

                                {renderError('purchase_qty')}
                            </div>

                            {/* Selling UOM */}
                            <div>
                                <label
                                    htmlFor="selling_uom_id"
                                    className={labelClass}
                                >
                                    Selling UOM
                                </label>

                                <select
                                    id="selling_uom_id"
                                    value={data.selling_uom_id}
                                    onChange={(event) =>
                                        handleSellingUomChange(
                                            event.target.value,
                                        )
                                    }
                                    required
                                    disabled={!data.purchase_uom_id}
                                    className={selectClass}
                                >
                                    <option value="">
                                        Select selling UOM
                                    </option>

                                    {sellingUomOptions.map((uom) => (
                                        <option
                                            key={uom.id}
                                            value={uom.id}
                                        >
                                            {uom.code} - {uom.name}
                                            {uom.is_active === false
                                                ? ' (Inactive)'
                                                : ''}
                                        </option>
                                    ))}
                                </select>

                                {renderError('selling_uom_id')}
                            </div>

                            {/* Selling Quantity */}
                            <div>
                                <label
                                    htmlFor="selling_qty"
                                    className={labelClass}
                                >
                                    Equivalent Selling Quantity
                                </label>

                                <input
                                    id="selling_qty"
                                    type="number"
                                    min="0.0001"
                                    step="0.0001"
                                    value={data.selling_qty}
                                    onChange={(event) =>
                                        handleSellingQtyChange(
                                            event.target.value,
                                        )
                                    }
                                    required
                                    className={inputClass}
                                    placeholder="Enter selling quantity"
                                />

                                {renderError('selling_qty')}
                            </div>

                            {/* Conversion Summary */}
                            <div className="rounded-lg border bg-muted/40 p-4 md:col-span-2">
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

                    {/* Weight Information */}
                    <div className="rounded-xl border bg-card p-6">
                        <div className="mb-6">
                            <h2 className="font-semibold">
                                Weight Information
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Enter the estimated weight of one purchase UOM in grams.
                            </p>
                        </div>

                        <div className="max-w-md">
                            <label
                                htmlFor="weight_grams"
                                className={labelClass}
                            >
                                Estimated Weight (grams)
                                <span className="ml-1 font-normal text-muted-foreground">
                                    (Optional)
                                </span>
                            </label>

                            <input
                                id="weight_grams"
                                type="number"
                                min="0"
                                step="0.0001"
                                value={data.weight_grams}
                                onChange={(event) =>
                                    setData(
                                        'weight_grams',
                                        event.target.value,
                                    )
                                }
                                className={inputClass}
                                placeholder="Enter estimated weight in grams"
                            />

                            {renderError('weight_grams')}

                            <p className="mt-2 text-xs text-muted-foreground">
                                Estimated weight of the purchase item. Example: 25000g or
                                25KG for 1 CASE. Leave as 0 if unknown.
                            </p>
                        </div>
                    </div>

                    {/* Pricing */}
                    {canManagePrices && (
                        <div className="rounded-xl border bg-card p-6">
                            <div className="mb-6">
                                <h2 className="font-semibold">
                                    Item Pricing
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Update prices per selling UOM. Leave a price blank if it is not yet configured.
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
                                                {priceType.is_active === false && (
                                                    <span className="ml-1 text-xs font-normal text-muted-foreground">
                                                        (Inactive)
                                                    </span>
                                                )}
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

                                            {renderError(
                                                `prices.${index}.price`,
                                            )}
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
                            {processing ? 'Updating...' : 'Update Item'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        {
            title: 'Items',
            href: '/admin/items',
        },
        {
            title: 'Edit Item',
            href: '#',
        },
    ],
};