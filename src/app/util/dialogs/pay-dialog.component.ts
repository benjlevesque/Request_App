import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Web3Service } from '../../util/web3.service';

@Component({
  templateUrl: './pay-dialog.component.html'
})
export class PayDialogComponent implements OnInit {
  request;
  payForm: FormGroup;
  amountFormControl: FormControl;
  allowForm: FormGroup;
  allowanceFormControl: FormControl;

  constructor(public web3Service: Web3Service, private formBuilder: FormBuilder, private dialogRef: MatDialogRef < PayDialogComponent > , @Inject(MAT_DIALOG_DATA) private data: any) {
    this.request = data.request;
  }


  ngOnInit() {
    const initialAmountValue = this.request.payee.expectedAmount.gt(this.request.payee.balance) ? this.web3Service.fromWei(this.request.payee.expectedAmount.sub(this.request.payee.balance).toString()) : '0';
    const amountValidator = [Validators.required, Validators.pattern('[0-9]*([\.][0-9]{0,18})?$')];

    this.amountFormControl = new FormControl(initialAmountValue, amountValidator);
    this.allowanceFormControl = new FormControl(initialAmountValue, amountValidator);
    this.payForm = this.formBuilder.group({
      amountFormControl: this.amountFormControl,
    });
    this.allowForm = this.formBuilder.group({
      allowanceFormControl: this.amountFormControl,
    });
  }

  allow() {
    const { requestId, payer } = this.request;
    console.log(requestId, this.allowForm.value.allowanceFormControl, {from: payer });
  }

  setMax() {
    this.amountFormControl.setValue(this.web3Service.fromWei(this.request.payee.expectedAmount.sub(this.request.payee.balance).toString()));
  }


  submit() {
    this.dialogRef.close(this.amountFormControl.value);
  }

}
