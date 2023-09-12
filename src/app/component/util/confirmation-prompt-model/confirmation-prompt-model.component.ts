import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'confirmation-prompt-model',
  templateUrl: './confirmation-prompt-model.component.html',
  styleUrls: ['./confirmation-prompt-model.component.scss']
})
export class ConfirmationPromptModelComponent implements OnInit {

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
  data:any = {};

  @Output()
  btnConfirmationEvent = new EventEmitter();

  confirmationTextFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200) ]);

  constructor() { }

  
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
  public btnConfirmationAP(): void {

    if(this.confirmationTextFormControl.valid){
      this.data.confirmationMessage = this.confirmationTextFormControl.value;
      this.btnConfirmationEvent.emit(this.data);
      this.visible = false;
      this.confirmationTextFormControl.reset();
    }else{
      this.confirmationTextFormControl.markAllAsTouched();
    }
    
  }

}
