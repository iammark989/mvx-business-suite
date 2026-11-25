import UserController from './UserController'
import UomController from './UomController'
import CategoryController from './CategoryController'
import SupplierController from './SupplierController'
import WarehouseController from './WarehouseController'
const Admin = {
    UserController: Object.assign(UserController, UserController),
UomController: Object.assign(UomController, UomController),
CategoryController: Object.assign(CategoryController, CategoryController),
SupplierController: Object.assign(SupplierController, SupplierController),
WarehouseController: Object.assign(WarehouseController, WarehouseController),
}

export default Admin