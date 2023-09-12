import { AddExpenceComponent } from "../component/manage-expence/add-expence/add-expence.component";
import { ViewExpenceComponent } from "../component/manage-expence/view-expence/view-expence.component";
import { ExpenseResolver } from "../resolver/expensse.resolver";

// Application Routes of front end ===================
export const APPLICATION_ROUTES = {

    addExpence:{
        path:'addExpence',
        component:AddExpenceComponent,
        resolve:{
            expence:ExpenseResolver
        }
    },
    viewExpence:{
        path:'viewExpence',
        component:ViewExpenceComponent,
        resolve:{
            expence:ExpenseResolver
        }
    }
}