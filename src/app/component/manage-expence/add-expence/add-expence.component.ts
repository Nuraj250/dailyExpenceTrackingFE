import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  scrollTop, setHttpListResponse, setHttResponse,
  getAbstractController, checkAndTouchFormValidation
} from 'src/app/utils/function';
import { Expence } from "src/app/model/expence.model"
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from 'src/app/service/expence.service';
import { APPLICATION_ROUTES } from 'src/app/utils/app.routes';

@Component({
  selector: 'app-add-expence',
  templateUrl: './add-expence.component.html',
  styleUrls: ['./add-expence.component.scss']
})
export class AddExpenceComponent implements OnInit {

  expenceInfoViewPath = "/" + APPLICATION_ROUTES.viewExpence.path.replace(":id", '');
  selectedExpence = new Expence();
  deletedExpence = new Expence();
  expences: Expence[] = [];
  deleteSelectedExpence: any
  expenseForm: any = new FormGroup({});
  expenceInfoUpdate: any = [];

  noOfRecordsPerPage: any = 10;
  dataSliceStart: any = 0;
  dataSliceEnd: any = this.noOfRecordsPerPage;
  viewPageNo: any = 0;

  constructor(private expenceService: ExpenseService,
    private activatedRoute: ActivatedRoute, private routerNavigate: Router) { }


  ngOnInit() {
    this.expenseForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    })
  }

  resetForm() {
    this.expenseForm.reset();
    this.expences = this.activatedRoute.snapshot.data?.['expence'];
    this.selectedExpence = new Expence();
    this.deletedExpence = new Expence();
  }

  /**
   * used to add function to cancel button
   */
  btnCancel() {
    this.resetForm();
  }

  getCurrentDate() {
    const currentYear = new Date().getFullYear();
    return new Date(currentYear + 1, 11, 31)
  }
  /**
   * used to add function to save button
   */
  public btnExpenceSubmit() {
    if (this.expenseForm.valid) {
      if (this.selectedExpence.id !== null) {
        const updatedExpence = this.expenseForm.value as Expence;
        setHttResponse<Expence>(this.expenceService.updateExpence(updatedExpence))
          .then(resolve => {
            if (resolve.message) {
              this.resetForm();
              this.findAllExpense();
            }
          })
      } else {
        let addExpence: Expence;
        addExpence = this.expenseForm.value;
        setHttResponse<Expence>(this.expenceService.saveExpence(addExpence))
          .then(resolve => {
            if (resolve.message) {
              this.resetForm();
              this.findAllExpense();
            }
          })
      }
    }
  }
  /**
   * used to get all Expences
   */
  private findAllExpense() {
    setHttpListResponse<Expence>(this.expenceService.getExpense())
      .then((res:any) => {
        this.expences = res;
      })
  }

  /**
   * used to add function to delete button
   */
  public deleteExpence() {
    if (this.deleteSelectedExpence.name) {
      setHttResponse(this.expenceService.deleteExpence(this.deleteSelectedExpence))
        .then(resolve => {
          if (resolve.message) {
            this.resetForm();
            this.findAllExpense();
          }
        })
    }
  }

  /**
   * used to get row data to from controller
   */
  public tbExpenceSelectUpdatingData(selectedRow: any) {
    this.selectedExpence = selectedRow;
    this.expenseForm.patchValue(this.selectedExpence);
  }

  /**
 * used to set data from expence Info component
 */
  SelectUpdatingData() {
    this.selectedExpence = this.expenceInfoUpdate;
    this.expenseForm.patchValue(this.expenceInfoUpdate);
  }

  /*used to show selected expence's data in the table from search
  * @param event
  */
  routeToexpenceInfo(value: any) {
    let routePath = APPLICATION_ROUTES.viewExpence.path.replace(":id", this.selectedExpence.id + '');
    this.routerNavigate.navigate([routePath], { state: { expenceDetails: value } });
  }
  /**
  * used to get abstract controller from function.ts class
  * @param fg
  * @param fc
  */
  public getAbstractController(fg: FormGroup, fc: string) {
    return getAbstractController(fg, fc);
  }

  /**
  * Used to check validation
  * @returns boolean
  */
  public checkAndTouchFormValidation(): boolean {
    return checkAndTouchFormValidation(this.expenseForm);
  }

  /**
   * Used to scroll to the top of the window
  * @description 
  */
  public scrollTop() {
    scrollTop();
  }

  /**
   *used to slice the expence array
  */
  public sliceArray(argument: { dataSliceStart: 0, dataSliceEnd: 2 }) {
    this.dataSliceStart = argument.dataSliceStart;
    this.dataSliceEnd = argument.dataSliceEnd;
  }
}
