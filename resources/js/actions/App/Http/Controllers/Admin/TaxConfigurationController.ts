import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::index
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:20
 * @route '/admin/tax-configurations'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/tax-configurations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::index
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:20
 * @route '/admin/tax-configurations'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::index
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:20
 * @route '/admin/tax-configurations'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::index
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:20
 * @route '/admin/tax-configurations'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::index
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:20
 * @route '/admin/tax-configurations'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::index
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:20
 * @route '/admin/tax-configurations'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::index
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:20
 * @route '/admin/tax-configurations'
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
* @see \App\Http\Controllers\Admin\TaxConfigurationController::create
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:55
 * @route '/admin/tax-configurations/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/tax-configurations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::create
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:55
 * @route '/admin/tax-configurations/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::create
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:55
 * @route '/admin/tax-configurations/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::create
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:55
 * @route '/admin/tax-configurations/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::create
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:55
 * @route '/admin/tax-configurations/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::create
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:55
 * @route '/admin/tax-configurations/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::create
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:55
 * @route '/admin/tax-configurations/create'
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
* @see \App\Http\Controllers\Admin\TaxConfigurationController::store
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:63
 * @route '/admin/tax-configurations'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/tax-configurations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::store
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:63
 * @route '/admin/tax-configurations'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::store
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:63
 * @route '/admin/tax-configurations'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::store
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:63
 * @route '/admin/tax-configurations'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::store
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:63
 * @route '/admin/tax-configurations'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::edit
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:139
 * @route '/admin/tax-configurations/{taxConfiguration}/edit'
 */
export const edit = (args: { taxConfiguration: number | { id: number } } | [taxConfiguration: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/tax-configurations/{taxConfiguration}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::edit
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:139
 * @route '/admin/tax-configurations/{taxConfiguration}/edit'
 */
edit.url = (args: { taxConfiguration: number | { id: number } } | [taxConfiguration: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { taxConfiguration: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { taxConfiguration: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    taxConfiguration: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        taxConfiguration: typeof args.taxConfiguration === 'object'
                ? args.taxConfiguration.id
                : args.taxConfiguration,
                }

    return edit.definition.url
            .replace('{taxConfiguration}', parsedArgs.taxConfiguration.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::edit
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:139
 * @route '/admin/tax-configurations/{taxConfiguration}/edit'
 */
edit.get = (args: { taxConfiguration: number | { id: number } } | [taxConfiguration: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::edit
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:139
 * @route '/admin/tax-configurations/{taxConfiguration}/edit'
 */
edit.head = (args: { taxConfiguration: number | { id: number } } | [taxConfiguration: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::edit
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:139
 * @route '/admin/tax-configurations/{taxConfiguration}/edit'
 */
    const editForm = (args: { taxConfiguration: number | { id: number } } | [taxConfiguration: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::edit
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:139
 * @route '/admin/tax-configurations/{taxConfiguration}/edit'
 */
        editForm.get = (args: { taxConfiguration: number | { id: number } } | [taxConfiguration: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::edit
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:139
 * @route '/admin/tax-configurations/{taxConfiguration}/edit'
 */
        editForm.head = (args: { taxConfiguration: number | { id: number } } | [taxConfiguration: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\TaxConfigurationController::update
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:148
 * @route '/admin/tax-configurations/{taxConfiguration}'
 */
export const update = (args: { taxConfiguration: number | { id: number } } | [taxConfiguration: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/tax-configurations/{taxConfiguration}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::update
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:148
 * @route '/admin/tax-configurations/{taxConfiguration}'
 */
update.url = (args: { taxConfiguration: number | { id: number } } | [taxConfiguration: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { taxConfiguration: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { taxConfiguration: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    taxConfiguration: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        taxConfiguration: typeof args.taxConfiguration === 'object'
                ? args.taxConfiguration.id
                : args.taxConfiguration,
                }

    return update.definition.url
            .replace('{taxConfiguration}', parsedArgs.taxConfiguration.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::update
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:148
 * @route '/admin/tax-configurations/{taxConfiguration}'
 */
update.put = (args: { taxConfiguration: number | { id: number } } | [taxConfiguration: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::update
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:148
 * @route '/admin/tax-configurations/{taxConfiguration}'
 */
    const updateForm = (args: { taxConfiguration: number | { id: number } } | [taxConfiguration: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::update
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:148
 * @route '/admin/tax-configurations/{taxConfiguration}'
 */
        updateForm.put = (args: { taxConfiguration: number | { id: number } } | [taxConfiguration: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\TaxConfigurationController::updateStatus
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:170
 * @route '/admin/tax-configurations/{taxConfiguration}/status'
 */
export const updateStatus = (args: { taxConfiguration: number | { id: number } } | [taxConfiguration: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

updateStatus.definition = {
    methods: ["patch"],
    url: '/admin/tax-configurations/{taxConfiguration}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::updateStatus
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:170
 * @route '/admin/tax-configurations/{taxConfiguration}/status'
 */
updateStatus.url = (args: { taxConfiguration: number | { id: number } } | [taxConfiguration: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { taxConfiguration: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { taxConfiguration: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    taxConfiguration: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        taxConfiguration: typeof args.taxConfiguration === 'object'
                ? args.taxConfiguration.id
                : args.taxConfiguration,
                }

    return updateStatus.definition.url
            .replace('{taxConfiguration}', parsedArgs.taxConfiguration.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::updateStatus
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:170
 * @route '/admin/tax-configurations/{taxConfiguration}/status'
 */
updateStatus.patch = (args: { taxConfiguration: number | { id: number } } | [taxConfiguration: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::updateStatus
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:170
 * @route '/admin/tax-configurations/{taxConfiguration}/status'
 */
    const updateStatusForm = (args: { taxConfiguration: number | { id: number } } | [taxConfiguration: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TaxConfigurationController::updateStatus
 * @see app/Http/Controllers/Admin/TaxConfigurationController.php:170
 * @route '/admin/tax-configurations/{taxConfiguration}/status'
 */
        updateStatusForm.patch = (args: { taxConfiguration: number | { id: number } } | [taxConfiguration: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateStatus.form = updateStatusForm
const TaxConfigurationController = { index, create, store, edit, update, updateStatus }

export default TaxConfigurationController