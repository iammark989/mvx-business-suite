import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\WarehouseController::index
 * @see app/Http/Controllers/Admin/WarehouseController.php:27
 * @route '/admin/warehouses'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/warehouses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\WarehouseController::index
 * @see app/Http/Controllers/Admin/WarehouseController.php:27
 * @route '/admin/warehouses'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WarehouseController::index
 * @see app/Http/Controllers/Admin/WarehouseController.php:27
 * @route '/admin/warehouses'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\WarehouseController::index
 * @see app/Http/Controllers/Admin/WarehouseController.php:27
 * @route '/admin/warehouses'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\WarehouseController::index
 * @see app/Http/Controllers/Admin/WarehouseController.php:27
 * @route '/admin/warehouses'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\WarehouseController::index
 * @see app/Http/Controllers/Admin/WarehouseController.php:27
 * @route '/admin/warehouses'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\WarehouseController::index
 * @see app/Http/Controllers/Admin/WarehouseController.php:27
 * @route '/admin/warehouses'
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
* @see \App\Http\Controllers\Admin\WarehouseController::create
 * @see app/Http/Controllers/Admin/WarehouseController.php:77
 * @route '/admin/warehouses/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/warehouses/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\WarehouseController::create
 * @see app/Http/Controllers/Admin/WarehouseController.php:77
 * @route '/admin/warehouses/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WarehouseController::create
 * @see app/Http/Controllers/Admin/WarehouseController.php:77
 * @route '/admin/warehouses/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\WarehouseController::create
 * @see app/Http/Controllers/Admin/WarehouseController.php:77
 * @route '/admin/warehouses/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\WarehouseController::create
 * @see app/Http/Controllers/Admin/WarehouseController.php:77
 * @route '/admin/warehouses/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\WarehouseController::create
 * @see app/Http/Controllers/Admin/WarehouseController.php:77
 * @route '/admin/warehouses/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\WarehouseController::create
 * @see app/Http/Controllers/Admin/WarehouseController.php:77
 * @route '/admin/warehouses/create'
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
* @see \App\Http\Controllers\Admin\WarehouseController::store
 * @see app/Http/Controllers/Admin/WarehouseController.php:89
 * @route '/admin/warehouses'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/warehouses',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\WarehouseController::store
 * @see app/Http/Controllers/Admin/WarehouseController.php:89
 * @route '/admin/warehouses'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WarehouseController::store
 * @see app/Http/Controllers/Admin/WarehouseController.php:89
 * @route '/admin/warehouses'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\WarehouseController::store
 * @see app/Http/Controllers/Admin/WarehouseController.php:89
 * @route '/admin/warehouses'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\WarehouseController::store
 * @see app/Http/Controllers/Admin/WarehouseController.php:89
 * @route '/admin/warehouses'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\WarehouseController::edit
 * @see app/Http/Controllers/Admin/WarehouseController.php:126
 * @route '/admin/warehouses/{warehouse}/edit'
 */
export const edit = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/warehouses/{warehouse}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\WarehouseController::edit
 * @see app/Http/Controllers/Admin/WarehouseController.php:126
 * @route '/admin/warehouses/{warehouse}/edit'
 */
edit.url = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { warehouse: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { warehouse: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    warehouse: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        warehouse: typeof args.warehouse === 'object'
                ? args.warehouse.id
                : args.warehouse,
                }

    return edit.definition.url
            .replace('{warehouse}', parsedArgs.warehouse.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WarehouseController::edit
 * @see app/Http/Controllers/Admin/WarehouseController.php:126
 * @route '/admin/warehouses/{warehouse}/edit'
 */
edit.get = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\WarehouseController::edit
 * @see app/Http/Controllers/Admin/WarehouseController.php:126
 * @route '/admin/warehouses/{warehouse}/edit'
 */
edit.head = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\WarehouseController::edit
 * @see app/Http/Controllers/Admin/WarehouseController.php:126
 * @route '/admin/warehouses/{warehouse}/edit'
 */
    const editForm = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\WarehouseController::edit
 * @see app/Http/Controllers/Admin/WarehouseController.php:126
 * @route '/admin/warehouses/{warehouse}/edit'
 */
        editForm.get = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\WarehouseController::edit
 * @see app/Http/Controllers/Admin/WarehouseController.php:126
 * @route '/admin/warehouses/{warehouse}/edit'
 */
        editForm.head = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\WarehouseController::update
 * @see app/Http/Controllers/Admin/WarehouseController.php:139
 * @route '/admin/warehouses/{warehouse}'
 */
export const update = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/warehouses/{warehouse}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\WarehouseController::update
 * @see app/Http/Controllers/Admin/WarehouseController.php:139
 * @route '/admin/warehouses/{warehouse}'
 */
update.url = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { warehouse: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { warehouse: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    warehouse: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        warehouse: typeof args.warehouse === 'object'
                ? args.warehouse.id
                : args.warehouse,
                }

    return update.definition.url
            .replace('{warehouse}', parsedArgs.warehouse.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WarehouseController::update
 * @see app/Http/Controllers/Admin/WarehouseController.php:139
 * @route '/admin/warehouses/{warehouse}'
 */
update.put = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\WarehouseController::update
 * @see app/Http/Controllers/Admin/WarehouseController.php:139
 * @route '/admin/warehouses/{warehouse}'
 */
    const updateForm = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\WarehouseController::update
 * @see app/Http/Controllers/Admin/WarehouseController.php:139
 * @route '/admin/warehouses/{warehouse}'
 */
        updateForm.put = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\WarehouseController::updateStatus
 * @see app/Http/Controllers/Admin/WarehouseController.php:174
 * @route '/admin/warehouses/{warehouse}/status'
 */
export const updateStatus = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

updateStatus.definition = {
    methods: ["patch"],
    url: '/admin/warehouses/{warehouse}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\WarehouseController::updateStatus
 * @see app/Http/Controllers/Admin/WarehouseController.php:174
 * @route '/admin/warehouses/{warehouse}/status'
 */
updateStatus.url = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { warehouse: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { warehouse: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    warehouse: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        warehouse: typeof args.warehouse === 'object'
                ? args.warehouse.id
                : args.warehouse,
                }

    return updateStatus.definition.url
            .replace('{warehouse}', parsedArgs.warehouse.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WarehouseController::updateStatus
 * @see app/Http/Controllers/Admin/WarehouseController.php:174
 * @route '/admin/warehouses/{warehouse}/status'
 */
updateStatus.patch = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\WarehouseController::updateStatus
 * @see app/Http/Controllers/Admin/WarehouseController.php:174
 * @route '/admin/warehouses/{warehouse}/status'
 */
    const updateStatusForm = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\WarehouseController::updateStatus
 * @see app/Http/Controllers/Admin/WarehouseController.php:174
 * @route '/admin/warehouses/{warehouse}/status'
 */
        updateStatusForm.patch = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateStatus.form = updateStatusForm
/**
* @see \App\Http\Controllers\Admin\WarehouseController::assignUsers
 * @see app/Http/Controllers/Admin/WarehouseController.php:222
 * @route '/admin/warehouses/{warehouse}/users'
 */
export const assignUsers = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: assignUsers.url(args, options),
    method: 'put',
})

assignUsers.definition = {
    methods: ["put"],
    url: '/admin/warehouses/{warehouse}/users',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\WarehouseController::assignUsers
 * @see app/Http/Controllers/Admin/WarehouseController.php:222
 * @route '/admin/warehouses/{warehouse}/users'
 */
assignUsers.url = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { warehouse: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { warehouse: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    warehouse: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        warehouse: typeof args.warehouse === 'object'
                ? args.warehouse.id
                : args.warehouse,
                }

    return assignUsers.definition.url
            .replace('{warehouse}', parsedArgs.warehouse.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WarehouseController::assignUsers
 * @see app/Http/Controllers/Admin/WarehouseController.php:222
 * @route '/admin/warehouses/{warehouse}/users'
 */
assignUsers.put = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: assignUsers.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\WarehouseController::assignUsers
 * @see app/Http/Controllers/Admin/WarehouseController.php:222
 * @route '/admin/warehouses/{warehouse}/users'
 */
    const assignUsersForm = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: assignUsers.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\WarehouseController::assignUsers
 * @see app/Http/Controllers/Admin/WarehouseController.php:222
 * @route '/admin/warehouses/{warehouse}/users'
 */
        assignUsersForm.put = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: assignUsers.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    assignUsers.form = assignUsersForm
/**
* @see \App\Http\Controllers\Admin\WarehouseController::editUsers
 * @see app/Http/Controllers/Admin/WarehouseController.php:198
 * @route '/admin/warehouses/{warehouse}/users'
 */
export const editUsers = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editUsers.url(args, options),
    method: 'get',
})

editUsers.definition = {
    methods: ["get","head"],
    url: '/admin/warehouses/{warehouse}/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\WarehouseController::editUsers
 * @see app/Http/Controllers/Admin/WarehouseController.php:198
 * @route '/admin/warehouses/{warehouse}/users'
 */
editUsers.url = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { warehouse: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { warehouse: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    warehouse: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        warehouse: typeof args.warehouse === 'object'
                ? args.warehouse.id
                : args.warehouse,
                }

    return editUsers.definition.url
            .replace('{warehouse}', parsedArgs.warehouse.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WarehouseController::editUsers
 * @see app/Http/Controllers/Admin/WarehouseController.php:198
 * @route '/admin/warehouses/{warehouse}/users'
 */
editUsers.get = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editUsers.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\WarehouseController::editUsers
 * @see app/Http/Controllers/Admin/WarehouseController.php:198
 * @route '/admin/warehouses/{warehouse}/users'
 */
editUsers.head = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: editUsers.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\WarehouseController::editUsers
 * @see app/Http/Controllers/Admin/WarehouseController.php:198
 * @route '/admin/warehouses/{warehouse}/users'
 */
    const editUsersForm = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: editUsers.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\WarehouseController::editUsers
 * @see app/Http/Controllers/Admin/WarehouseController.php:198
 * @route '/admin/warehouses/{warehouse}/users'
 */
        editUsersForm.get = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: editUsers.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\WarehouseController::editUsers
 * @see app/Http/Controllers/Admin/WarehouseController.php:198
 * @route '/admin/warehouses/{warehouse}/users'
 */
        editUsersForm.head = (args: { warehouse: number | { id: number } } | [warehouse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: editUsers.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    editUsers.form = editUsersForm
const WarehouseController = { index, create, store, edit, update, updateStatus, assignUsers, editUsers }

export default WarehouseController