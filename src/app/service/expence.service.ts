import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Expence } from '../model/expence.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) {
  }

  public getExpense(): Observable<any> {
    return this.http.get(environment.baseUrl + '/getAll');
  }

  public saveExpence(expence: Expence): Observable<any> {
    return this.http.post(environment.baseUrl + '/save', expence);
  }

  public updateExpence(expence: Expence): Observable<any> {
    return this.http.put(environment.baseUrl + `/update/${expence.id}`, expence);
  }

  public deleteExpence(id: any): Observable<any> {
    return this.http.delete(environment.baseUrl + `/deleteEmployee/${id}`);
  }
}