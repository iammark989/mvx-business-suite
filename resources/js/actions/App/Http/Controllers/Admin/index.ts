import UserController from './UserController'
import UomController from './UomController'
import CategoryController from './CategoryController'
import SupplierController from './SupplierController'
import WarehouseController from './WarehouseController'
import BrandController from './BrandController'
import PriceTypeController from './PriceTypeController'
import TaxConfigurationController from './TaxConfigurationController'
import ItemController from './ItemController'
const Admin = {
    UserController: Object.assign(UserController, UserController),
UomController: Object.assign(UomController, UomController),
CategoryController: Object.assign(CategoryController, CategoryController),
SupplierController: Object.assign(SupplierController, SupplierController),
WarehouseController: Object.assign(WarehouseController, WarehouseController),
BrandController: Object.assign(BrandController, BrandController),
PriceTypeController: Object.assign(PriceTypeController, PriceTypeController),
TaxConfigurationController: Object.assign(TaxConfigurationController, TaxConfigurationController),
ItemController: Object.assign(ItemController, ItemController),
}

export default Admin