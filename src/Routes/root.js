import BranchDetail from '../Pages/Branch/Detail'
import BranchManager from '../Pages/Branch/Manager'
import DriverAuthorizationQrcode from '../Pages/Mobile/DriverQrcodeAuthorization'
import DriverDetail from '../Pages/Driver/Detail'
import DriverManager from '../Pages/Driver/Manager'
import DriverMobile from '../Pages/Mobile/DriverMobile'
import DriverMobileSuccess from '../Pages/Mobile/DriverMobileSuccess'
import DriverOperationMobile from '../Pages/Mobile/DriverOperationMobile'
import Home from '../Pages/Home'
import MaintenanceDetail from '../Pages/MaintenanceOrder/Detail'
import MaintenanceDetailMobile from '../Pages/Mobile/MaintenanceDetailMobile'
import MaintenanceManager from '../Pages/MaintenanceOrder/Manager'
import MaintenanceManagerMobile from '../Pages/Mobile/MaintenanceManagerMobile/Manager'
import MyInfo from '../Pages/MyInfo'
import MyTeam from '../Pages/MyTeam/Manager'
import OperationDetail from '../Pages/Operation/Detail'
import OperationManager from '../Pages/Operation/Manager'
import UpdateMyPassword from '../Pages/UpdateMyPassword'
import VehicleManager from '../Pages/Vehicle/Manager'
import VehicleDetail from '../Pages/Vehicle/Detail'
import VehicleTypeMananger from '../Pages/VehicleType/Manager'

const RootRoutes = [
  {
    component: MaintenanceManagerMobile,
    title: '',
    path: '/logged/mobile-maintenance',
    exact: true,
    goBack: true
  },
  {
    component: MyInfo,
    title: 'MINHA CONTA',
    path: '/logged/account-myinfo',
    exact: true,
    goBack: true
  },
  {
    component: MyTeam,
    title: 'MINHA EQUIPE',
    path: '/logged/account-myteam',
    exact: true,
    goBack: true
  },
  {
    component: UpdateMyPassword,
    title: 'ALTERAR SENHA',
    path: '/logged/account-password',
    exact: true,
    goBack: true
  },
  {
    component: VehicleManager,
    title: 'VEÍCULOS',
    path: '/logged/vehicle/manager',
    exact: true,
    goBack: false
  },
  {
    component: VehicleDetail,
    title: 'DETALHES DO VEÍCULOS',
    path: '/logged/vehicle/detail/:id',
    exact: true,
    goBack: true
  },
  {
    component: Home,
    title: 'DASHBOARD',
    path: '/logged/dashboard',
    exact: true
  },
  {
    component: MaintenanceManager,
    title: 'MANUTENÇÃO',
    path: '/logged/maintenance/manager',
    exact: true,
    goBack: false
  },
  {
    component: DriverManager,
    title: 'MOTORISTA',
    path: '/logged/driver/manager',
    exact: true,
    goBack: false
  },
  {
    component: DriverOperationMobile,
    title: '',
    path: '/logged/mobile-operation',
    exact: true,
    goBack: true
  },
  {
    component: VehicleTypeMananger,
    title: 'TIPO VEÍCULO',
    path: '/logged/vehicle-type/manager',
    exact: true,
    goBack: false
  },
  {
    component: BranchManager,
    title: 'UNIDADE',
    path: '/logged/branch/manager',
    exact: true,
    goBack: false
  },
  {
    component: OperationManager,
    title: 'OPERAÇÃO',
    path: '/logged/operation/manager',
    exact: true,
    goBack: false
  },
  {
    component: MaintenanceDetailMobile,
    title: '',
    path: '/logged/mobile-maintenance-detail/:id',
    exact: true,
    goBack: false
  },
  {
    component: MaintenanceDetail,
    title: 'DETALHES DA MANUTENÇÃO',
    path: '/logged/maintenance/detail/:id',
    exact: true,
    goBack: true
  },
  {
    component: DriverDetail,
    title: 'DETALHES DO MOTORISTA',
    path: '/logged/driver/detail/:id',
    exact: true,
    goBack: true
  },
  {
    component: BranchDetail,
    title: 'DETALHES DA FILIAL',
    path: '/logged/branch/detail/:id',
    exact: true,
    goBack: true
  },
  {
    component: OperationDetail,
    title: 'DETALHES DA OPERAÇÃO',
    path: '/logged/operation/detail/:id',
    exact: true,
    goBack: true
  },
  {
    component: DriverAuthorizationQrcode,
    title: '',
    path: '/authorization-qrcode',
    exact: false,
    goBack: false
  }
]

export default RootRoutes
