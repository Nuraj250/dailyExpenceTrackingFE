import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'confirmation-model',
  templateUrl: './confirmation-model.component.html',
  styleUrls: ['./confirmation-model.component.scss']
})
export class ConfirmationModelComponent implements OnInit {

  @Input()
  visible = false;
  @Input()
  modelTitle = "";
  @Input()
  modelBody = "";
  @Input()
  btnConfirmationText = "Confirm";
  @Input()
  btnCancelText = "Cancel";

  @Input()
  data:any;

  @Output()
  btnConfirmationEvent = new EventEmitter();

  constructor() { 
   
  }

  
  ngOnInit(): void {

   }

  toggleLiveModel() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  /**
   * Used to invoke Confirmation Button click action
   */
  btnConfirmationAP(): void {
    this.btnConfirmationEvent.emit(this.data);
    this.visible = false;
  }
}
