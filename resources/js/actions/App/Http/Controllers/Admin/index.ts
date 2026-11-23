import UserController from './UserController'
import UomController from './UomController'
const Admin = {
    UserController: Object.assign(UserController, UserController),
UomController: Object.assign(UomController, UomController),
}

export default Admin