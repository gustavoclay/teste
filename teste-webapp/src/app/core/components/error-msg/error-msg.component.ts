import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormValidations } from './../../../model/utils/FormValidations';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html'
})
export class ErrorMsgComponent implements OnInit {

  @Input() label: string;
  @Input() control: FormControl;

  constructor() { }

  ngOnInit() {
  }

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }

}
