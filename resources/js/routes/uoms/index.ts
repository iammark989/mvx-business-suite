import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\UomController::index
 * @see app/Http/Controllers/Admin/UomController.php:21
 * @route '/admin/uoms'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/uoms',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\UomController::index
 * @see app/Http/Controllers/Admin/UomController.php:21
 * @route '/admin/uoms'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\UomController::index
 * @see app/Http/Controllers/Admin/UomController.php:21
 * @route '/admin/uoms'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\UomController::index
 * @see app/Http/Controllers/Admin/UomController.php:21
 * @route '/admin/uoms'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\UomController::index
 * @see app/Http/Controllers/Admin/UomController.php:21
 * @route '/admin/uoms'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\UomController::index
 * @see app/Http/Controllers/Admin/UomController.php:21
 * @route '/admin/uoms'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\UomController::index
 * @see app/Http/Controllers/Admin/UomController.php:21
 * @route '/admin/uoms'
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
* @see \App\Http\Controllers\Admin\UomController::create
 * @see app/Http/Controllers/Admin/UomController.php:69
 * @route '/admin/uoms/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/uoms/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\UomController::create
 * @see app/Http/Controllers/Admin/UomController.php:69
 * @route '/admin/uoms/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\UomController::create
 * @see app/Http/Controllers/Admin/UomController.php:69
 * @route '/admin/uoms/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\UomController::create
 * @see app/Http/Controllers/Admin/UomController.php:69
 * @route '/admin/uoms/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\UomController::create
 * @see app/Http/Controllers/Admin/UomController.php:69
 * @route '/admin/uoms/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\UomController::create
 * @see app/Http/Controllers/Admin/UomController.php:69
 * @route '/admin/uoms/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\UomController::create
 * @see app/Http/Controllers/Admin/UomController.php:69
 * @route '/admin/uoms/create'
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
* @see \App\Http\Controllers\Admin\UomController::store
 * @see app/Http/Controllers/Admin/UomController.php:79
 * @route '/admin/uoms'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/uoms',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\UomController::store
 * @see app/Http/Controllers/Admin/UomController.php:79
 * @route '/admin/uoms'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\UomController::store
 * @see app/Http/Controllers/Admin/UomController.php:79
 * @route '/admin/uoms'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\UomController::store
 * @see app/Http/Controllers/Admin/UomController.php:79
 * @route '/admin/uoms'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\UomController::store
 * @see app/Http/Controllers/Admin/UomController.php:79
 * @route '/admin/uoms'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\UomController::edit
 * @see app/Http/Controllers/Admin/UomController.php:122
 * @route '/admin/uoms/{uom}/edit'
 */
export const edit = (args: { uom: number | { id: number } } | [uom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/uoms/{uom}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\UomController::edit
 * @see app/Http/Controllers/Admin/UomController.php:122
 * @route '/admin/uoms/{uom}/edit'
 */
edit.url = (args: { uom: number | { id: number } } | [uom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { uom: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { uom: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    uom: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        uom: typeof args.uom === 'object'
                ? args.uom.id
                : args.uom,
                }

    return edit.definition.url
            .replace('{uom}', parsedArgs.uom.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\UomController::edit
 * @see app/Http/Controllers/Admin/UomController.php:122
 * @route '/admin/uoms/{uom}/edit'
 */
edit.get = (args: { uom: number | { id: number } } | [uom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\UomController::edit
 * @see app/Http/Controllers/Admin/UomController.php:122
 * @route '/admin/uoms/{uom}/edit'
 */
edit.head = (args: { uom: number | { id: number } } | [uom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\UomController::edit
 * @see app/Http/Controllers/Admin/UomController.php:122
 * @route '/admin/uoms/{uom}/edit'
 */
    const editForm = (args: { uom: number | { id: number } } | [uom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\UomController::edit
 * @see app/Http/Controllers/Admin/UomController.php:122
 * @route '/admin/uoms/{uom}/edit'
 */
        editForm.get = (args: { uom: number | { id: number } } | [uom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\UomController::edit
 * @see app/Http/Controllers/Admin/UomController.php:122
 * @route '/admin/uoms/{uom}/edit'
 */
        editForm.head = (args: { uom: number | { id: number } } | [uom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\UomController::update
 * @see app/Http/Controllers/Admin/UomController.php:141
 * @route '/admin/uoms/{uom}'
 */
export const update = (args: { uom: number | { id: number } } | [uom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/uoms/{uom}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\UomController::update
 * @see app/Http/Controllers/Admin/UomController.php:141
 * @route '/admin/uoms/{uom}'
 */
update.url = (args: { uom: number | { id: number } } | [uom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { uom: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { uom: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    uom: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        uom: typeof args.uom === 'object'
                ? args.uom.id
                : args.uom,
                }

    return update.definition.url
            .replace('{uom}', parsedArgs.uom.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\UomController::update
 * @see app/Http/Controllers/Admin/UomController.php:141
 * @route '/admin/uoms/{uom}'
 */
update.put = (args: { uom: number | { id: number } } | [uom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\UomController::update
 * @see app/Http/Controllers/Admin/UomController.php:141
 * @route '/admin/uoms/{uom}'
 */
    const updateForm = (args: { uom: number | { id: number } } | [uom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\UomController::update
 * @see app/Http/Controllers/Admin/UomController.php:141
 * @route '/admin/uoms/{uom}'
 */
        updateForm.put = (args: { uom: number | { id: number } } | [uom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\UomController::updateStatus
 * @see app/Http/Controllers/Admin/UomController.php:199
 * @route '/admin/uoms/{uom}/status'
 */
export const updateStatus = (args: { uom: number | { id: number } } | [uom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

updateStatus.definition = {
    methods: ["patch"],
    url: '/admin/uoms/{uom}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\UomController::updateStatus
 * @see app/Http/Controllers/Admin/UomController.php:199
 * @route '/admin/uoms/{uom}/status'
 */
updateStatus.url = (args: { uom: number | { id: number } } | [uom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { uom: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { uom: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    uom: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        uom: typeof args.uom === 'object'
                ? args.uom.id
                : args.uom,
                }

    return updateStatus.definition.url
            .replace('{uom}', parsedArgs.uom.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\UomController::updateStatus
 * @see app/Http/Controllers/Admin/UomController.php:199
 * @route '/admin/uoms/{uom}/status'
 */
updateStatus.patch = (args: { uom: number | { id: number } } | [uom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\UomController::updateStatus
 * @see app/Http/Controllers/Admin/UomController.php:199
 * @route '/admin/uoms/{uom}/status'
 */
    const updateStatusForm = (args: { uom: number | { id: number } } | [uom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\UomController::updateStatus
 * @see app/Http/Controllers/Admin/UomController.php:199
 * @route '/admin/uoms/{uom}/status'
 */
        updateStatusForm.patch = (args: { uom: number | { id: number } } | [uom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateStatus.form = updateStatusForm
const uoms = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
updateStatus: Object.assign(updateStatus, updateStatus),
}

export default uoms