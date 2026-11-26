import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PriceTypeController::index
 * @see app/Http/Controllers/Admin/PriceTypeController.php:12
 * @route '/admin/price-types'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/price-types',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PriceTypeController::index
 * @see app/Http/Controllers/Admin/PriceTypeController.php:12
 * @route '/admin/price-types'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PriceTypeController::index
 * @see app/Http/Controllers/Admin/PriceTypeController.php:12
 * @route '/admin/price-types'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PriceTypeController::index
 * @see app/Http/Controllers/Admin/PriceTypeController.php:12
 * @route '/admin/price-types'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PriceTypeController::index
 * @see app/Http/Controllers/Admin/PriceTypeController.php:12
 * @route '/admin/price-types'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PriceTypeController::index
 * @see app/Http/Controllers/Admin/PriceTypeController.php:12
 * @route '/admin/price-types'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PriceTypeController::index
 * @see app/Http/Controllers/Admin/PriceTypeController.php:12
 * @route '/admin/price-types'
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
* @see \App\Http\Controllers\Admin\PriceTypeController::create
 * @see app/Http/Controllers/Admin/PriceTypeController.php:38
 * @route '/admin/price-types/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/price-types/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PriceTypeController::create
 * @see app/Http/Controllers/Admin/PriceTypeController.php:38
 * @route '/admin/price-types/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PriceTypeController::create
 * @see app/Http/Controllers/Admin/PriceTypeController.php:38
 * @route '/admin/price-types/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PriceTypeController::create
 * @see app/Http/Controllers/Admin/PriceTypeController.php:38
 * @route '/admin/price-types/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PriceTypeController::create
 * @see app/Http/Controllers/Admin/PriceTypeController.php:38
 * @route '/admin/price-types/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PriceTypeController::create
 * @see app/Http/Controllers/Admin/PriceTypeController.php:38
 * @route '/admin/price-types/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PriceTypeController::create
 * @see app/Http/Controllers/Admin/PriceTypeController.php:38
 * @route '/admin/price-types/create'
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
* @see \App\Http\Controllers\Admin\PriceTypeController::store
 * @see app/Http/Controllers/Admin/PriceTypeController.php:43
 * @route '/admin/price-types'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/price-types',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PriceTypeController::store
 * @see app/Http/Controllers/Admin/PriceTypeController.php:43
 * @route '/admin/price-types'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PriceTypeController::store
 * @see app/Http/Controllers/Admin/PriceTypeController.php:43
 * @route '/admin/price-types'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\PriceTypeController::store
 * @see app/Http/Controllers/Admin/PriceTypeController.php:43
 * @route '/admin/price-types'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PriceTypeController::store
 * @see app/Http/Controllers/Admin/PriceTypeController.php:43
 * @route '/admin/price-types'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\PriceTypeController::edit
 * @see app/Http/Controllers/Admin/PriceTypeController.php:73
 * @route '/admin/price-types/{priceType}/edit'
 */
export const edit = (args: { priceType: number | { id: number } } | [priceType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/price-types/{priceType}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PriceTypeController::edit
 * @see app/Http/Controllers/Admin/PriceTypeController.php:73
 * @route '/admin/price-types/{priceType}/edit'
 */
edit.url = (args: { priceType: number | { id: number } } | [priceType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { priceType: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { priceType: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    priceType: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        priceType: typeof args.priceType === 'object'
                ? args.priceType.id
                : args.priceType,
                }

    return edit.definition.url
            .replace('{priceType}', parsedArgs.priceType.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PriceTypeController::edit
 * @see app/Http/Controllers/Admin/PriceTypeController.php:73
 * @route '/admin/price-types/{priceType}/edit'
 */
edit.get = (args: { priceType: number | { id: number } } | [priceType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PriceTypeController::edit
 * @see app/Http/Controllers/Admin/PriceTypeController.php:73
 * @route '/admin/price-types/{priceType}/edit'
 */
edit.head = (args: { priceType: number | { id: number } } | [priceType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PriceTypeController::edit
 * @see app/Http/Controllers/Admin/PriceTypeController.php:73
 * @route '/admin/price-types/{priceType}/edit'
 */
    const editForm = (args: { priceType: number | { id: number } } | [priceType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PriceTypeController::edit
 * @see app/Http/Controllers/Admin/PriceTypeController.php:73
 * @route '/admin/price-types/{priceType}/edit'
 */
        editForm.get = (args: { priceType: number | { id: number } } | [priceType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PriceTypeController::edit
 * @see app/Http/Controllers/Admin/PriceTypeController.php:73
 * @route '/admin/price-types/{priceType}/edit'
 */
        editForm.head = (args: { priceType: number | { id: number } } | [priceType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\PriceTypeController::update
 * @see app/Http/Controllers/Admin/PriceTypeController.php:80
 * @route '/admin/price-types/{priceType}'
 */
export const update = (args: { priceType: number | { id: number } } | [priceType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/price-types/{priceType}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\PriceTypeController::update
 * @see app/Http/Controllers/Admin/PriceTypeController.php:80
 * @route '/admin/price-types/{priceType}'
 */
update.url = (args: { priceType: number | { id: number } } | [priceType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { priceType: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { priceType: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    priceType: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        priceType: typeof args.priceType === 'object'
                ? args.priceType.id
                : args.priceType,
                }

    return update.definition.url
            .replace('{priceType}', parsedArgs.priceType.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PriceTypeController::update
 * @see app/Http/Controllers/Admin/PriceTypeController.php:80
 * @route '/admin/price-types/{priceType}'
 */
update.put = (args: { priceType: number | { id: number } } | [priceType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\PriceTypeController::update
 * @see app/Http/Controllers/Admin/PriceTypeController.php:80
 * @route '/admin/price-types/{priceType}'
 */
    const updateForm = (args: { priceType: number | { id: number } } | [priceType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PriceTypeController::update
 * @see app/Http/Controllers/Admin/PriceTypeController.php:80
 * @route '/admin/price-types/{priceType}'
 */
        updateForm.put = (args: { priceType: number | { id: number } } | [priceType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\PriceTypeController::updateStatus
 * @see app/Http/Controllers/Admin/PriceTypeController.php:108
 * @route '/admin/price-types/{priceType}/status'
 */
export const updateStatus = (args: { priceType: number | { id: number } } | [priceType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

updateStatus.definition = {
    methods: ["patch"],
    url: '/admin/price-types/{priceType}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\PriceTypeController::updateStatus
 * @see app/Http/Controllers/Admin/PriceTypeController.php:108
 * @route '/admin/price-types/{priceType}/status'
 */
updateStatus.url = (args: { priceType: number | { id: number } } | [priceType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { priceType: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { priceType: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    priceType: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        priceType: typeof args.priceType === 'object'
                ? args.priceType.id
                : args.priceType,
                }

    return updateStatus.definition.url
            .replace('{priceType}', parsedArgs.priceType.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PriceTypeController::updateStatus
 * @see app/Http/Controllers/Admin/PriceTypeController.php:108
 * @route '/admin/price-types/{priceType}/status'
 */
updateStatus.patch = (args: { priceType: number | { id: number } } | [priceType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\PriceTypeController::updateStatus
 * @see app/Http/Controllers/Admin/PriceTypeController.php:108
 * @route '/admin/price-types/{priceType}/status'
 */
    const updateStatusForm = (args: { priceType: number | { id: number } } | [priceType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PriceTypeController::updateStatus
 * @see app/Http/Controllers/Admin/PriceTypeController.php:108
 * @route '/admin/price-types/{priceType}/status'
 */
        updateStatusForm.patch = (args: { priceType: number | { id: number } } | [priceType: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateStatus.form = updateStatusForm
const priceTypes = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
updateStatus: Object.assign(updateStatus, updateStatus),
}

export default priceTypes