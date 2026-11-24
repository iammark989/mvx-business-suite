import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SupplierController::index
 * @see app/Http/Controllers/Admin/SupplierController.php:17
 * @route '/admin/suppliers'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/suppliers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SupplierController::index
 * @see app/Http/Controllers/Admin/SupplierController.php:17
 * @route '/admin/suppliers'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SupplierController::index
 * @see app/Http/Controllers/Admin/SupplierController.php:17
 * @route '/admin/suppliers'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\SupplierController::index
 * @see app/Http/Controllers/Admin/SupplierController.php:17
 * @route '/admin/suppliers'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\SupplierController::index
 * @see app/Http/Controllers/Admin/SupplierController.php:17
 * @route '/admin/suppliers'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\SupplierController::index
 * @see app/Http/Controllers/Admin/SupplierController.php:17
 * @route '/admin/suppliers'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\SupplierController::index
 * @see app/Http/Controllers/Admin/SupplierController.php:17
 * @route '/admin/suppliers'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Admin\SupplierController::create
 * @see app/Http/Controllers/Admin/SupplierController.php:61
 * @route '/admin/suppliers/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/suppliers/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SupplierController::create
 * @see app/Http/Controllers/Admin/SupplierController.php:61
 * @route '/admin/suppliers/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SupplierController::create
 * @see app/Http/Controllers/Admin/SupplierController.php:61
 * @route '/admin/suppliers/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\SupplierController::create
 * @see app/Http/Controllers/Admin/SupplierController.php:61
 * @route '/admin/suppliers/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\SupplierController::create
 * @see app/Http/Controllers/Admin/SupplierController.php:61
 * @route '/admin/suppliers/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\SupplierController::create
 * @see app/Http/Controllers/Admin/SupplierController.php:61
 * @route '/admin/suppliers/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\SupplierController::create
 * @see app/Http/Controllers/Admin/SupplierController.php:61
 * @route '/admin/suppliers/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Admin\SupplierController::store
 * @see app/Http/Controllers/Admin/SupplierController.php:71
 * @route '/admin/suppliers'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/suppliers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SupplierController::store
 * @see app/Http/Controllers/Admin/SupplierController.php:71
 * @route '/admin/suppliers'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SupplierController::store
 * @see app/Http/Controllers/Admin/SupplierController.php:71
 * @route '/admin/suppliers'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\SupplierController::store
 * @see app/Http/Controllers/Admin/SupplierController.php:71
 * @route '/admin/suppliers'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\SupplierController::store
 * @see app/Http/Controllers/Admin/SupplierController.php:71
 * @route '/admin/suppliers'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\SupplierController::edit
 * @see app/Http/Controllers/Admin/SupplierController.php:116
 * @route '/admin/suppliers/{supplier}/edit'
 */
export const edit = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/suppliers/{supplier}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SupplierController::edit
 * @see app/Http/Controllers/Admin/SupplierController.php:116
 * @route '/admin/suppliers/{supplier}/edit'
 */
edit.url = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { supplier: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { supplier: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    supplier: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        supplier: typeof args.supplier === 'object'
                ? args.supplier.id
                : args.supplier,
                }

    return edit.definition.url
            .replace('{supplier}', parsedArgs.supplier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SupplierController::edit
 * @see app/Http/Controllers/Admin/SupplierController.php:116
 * @route '/admin/suppliers/{supplier}/edit'
 */
edit.get = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\SupplierController::edit
 * @see app/Http/Controllers/Admin/SupplierController.php:116
 * @route '/admin/suppliers/{supplier}/edit'
 */
edit.head = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\SupplierController::edit
 * @see app/Http/Controllers/Admin/SupplierController.php:116
 * @route '/admin/suppliers/{supplier}/edit'
 */
    const editForm = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\SupplierController::edit
 * @see app/Http/Controllers/Admin/SupplierController.php:116
 * @route '/admin/suppliers/{supplier}/edit'
 */
        editForm.get = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\SupplierController::edit
 * @see app/Http/Controllers/Admin/SupplierController.php:116
 * @route '/admin/suppliers/{supplier}/edit'
 */
        editForm.head = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Admin\SupplierController::update
 * @see app/Http/Controllers/Admin/SupplierController.php:128
 * @route '/admin/suppliers/{supplier}'
 */
export const update = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/suppliers/{supplier}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\SupplierController::update
 * @see app/Http/Controllers/Admin/SupplierController.php:128
 * @route '/admin/suppliers/{supplier}'
 */
update.url = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { supplier: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { supplier: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    supplier: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        supplier: typeof args.supplier === 'object'
                ? args.supplier.id
                : args.supplier,
                }

    return update.definition.url
            .replace('{supplier}', parsedArgs.supplier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SupplierController::update
 * @see app/Http/Controllers/Admin/SupplierController.php:128
 * @route '/admin/suppliers/{supplier}'
 */
update.put = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\SupplierController::update
 * @see app/Http/Controllers/Admin/SupplierController.php:128
 * @route '/admin/suppliers/{supplier}'
 */
    const updateForm = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\SupplierController::update
 * @see app/Http/Controllers/Admin/SupplierController.php:128
 * @route '/admin/suppliers/{supplier}'
 */
        updateForm.put = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\SupplierController::updateStatus
 * @see app/Http/Controllers/Admin/SupplierController.php:171
 * @route '/admin/suppliers/{supplier}/status'
 */
export const updateStatus = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

updateStatus.definition = {
    methods: ["patch"],
    url: '/admin/suppliers/{supplier}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\SupplierController::updateStatus
 * @see app/Http/Controllers/Admin/SupplierController.php:171
 * @route '/admin/suppliers/{supplier}/status'
 */
updateStatus.url = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { supplier: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { supplier: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    supplier: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        supplier: typeof args.supplier === 'object'
                ? args.supplier.id
                : args.supplier,
                }

    return updateStatus.definition.url
            .replace('{supplier}', parsedArgs.supplier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SupplierController::updateStatus
 * @see app/Http/Controllers/Admin/SupplierController.php:171
 * @route '/admin/suppliers/{supplier}/status'
 */
updateStatus.patch = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\SupplierController::updateStatus
 * @see app/Http/Controllers/Admin/SupplierController.php:171
 * @route '/admin/suppliers/{supplier}/status'
 */
    const updateStatusForm = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\SupplierController::updateStatus
 * @see app/Http/Controllers/Admin/SupplierController.php:171
 * @route '/admin/suppliers/{supplier}/status'
 */
        updateStatusForm.patch = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateStatus.form = updateStatusForm
const suppliers = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
updateStatus: Object.assign(updateStatus, updateStatus),
}

export default suppliers