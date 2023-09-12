import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ExpenseService } from '../service/expence.service';
import { setHttpListResponse } from '../utils/function';

export class ExpenseResolver implements Resolve<any>{

  constructor(private expenseService: ExpenseService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const component = route.routeConfig?.component?.name;
      return setHttpListResponse(this.expenseService.getExpense())
  }
}
