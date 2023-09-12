import { INavData } from '@coreui/angular';
import { APPLICATION_ROUTES } from 'src/app/utils/app.routes';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'Manage Expence',
    url: APPLICATION_ROUTES.addExpence.path,
    iconComponent: { name: 'cil-drop' }
  }
]
