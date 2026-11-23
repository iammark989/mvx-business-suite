import UserController from './UserController'
import UomController from './UomController'
import CategoryController from './CategoryController'
const Admin = {
    UserController: Object.assign(UserController, UserController),
UomController: Object.assign(UomController, UomController),
CategoryController: Object.assign(CategoryController, CategoryController),
}

export default Admin