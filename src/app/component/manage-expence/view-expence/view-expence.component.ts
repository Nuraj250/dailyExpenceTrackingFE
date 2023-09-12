import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Expence } from 'src/app/model/expence.model';
import { APPLICATION_ROUTES } from 'src/app/utils/app.routes';

@Component({
  selector: 'app-view-expence',
  templateUrl: './view-expence.component.html',
  styleUrls: ['./view-expence.component.scss']
})
export class ViewExpenceComponent implements OnInit{


  expence:any=new Expence();
  constructor(private routerNavigate: Router,
    private activatedRoute: ActivatedRoute,
  ) {

  }
  ngOnInit(): void {
    this.expence=history.state.expenceDetails;
  }

  /**
  * used to send data to expence component to update
  * @param value 
  */
    update(value: Expence): void {
      let routePath = APPLICATION_ROUTES.addExpence.path;
      this.routerNavigate.navigate([routePath], { state: { expenceInfoo: value } });
    }
}
