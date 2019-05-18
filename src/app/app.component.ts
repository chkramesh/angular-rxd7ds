
  import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { MatSelectModule, MatInputModule, MatButtonModule, MatDatepickerModule } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import { ManagerhistoryService } from '../../services/managerhistory.service';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-edit-manager-dialog',
  templateUrl: './edit-manager-dialog.component.html',
  styleUrls: ['./edit-manager-dialog.component.css']
})
export class EditManagerDialogComponent {
 startDateDivShow: boolean;
 endDateDivShow: boolean;
 editManagerForm;
 scrDefConst: String;
 command: String;
 formatType: String;
 managerName: any;
 managerProduct: any;
 managerId: any;
 productId: any;
 assignMgrStartDateList: any;
 startDate: any;
 assignMgrEndDateList: any;
 endDate: any;
 submitted = false;
 currentDate: Date;
 startDateMessage;
 endDateMessage;
 assignMgrEndDateListOption: boolean;
 message;
 constructor (
  public dialogRef: MatDialogRef<EditManagerDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private appService: ManagerhistoryService,
  private dataServices: DataService,
  private formBuilder: FormBuilder) {
   this.currentDate = new Date();
   this.dataServices.retainCurrentData.subscribe((message: any) => {
    console.log('RETAINVALUES-IN-COMPONENT', message);
    console.log(message);
   });
   // this.message = '';
   if ( this.message === 1) {
    const item: any[] = [{
     'endDateList' : [
      { code: 'asOfDate', description: 'As Of Date' },
      { code: 'allHistory', description: 'Current' }
     ]
    }];
    this.assignMgrEndDateListOption = item[0].endDateList;
   } else {
    // this.assignMgrEndDateListOption = true;
    const item: any[] = [{
     'endDateList': [ { code: 'asOfDate', description: 'As Of Date' } ]
    }];
    this.assignMgrEndDateListOption = item[0].endDateList;
   }
   console.log('assignMgrEndDateListOption');
   console.log(this.assignMgrEndDateListOption);
   if (data.startDate) {
    this.startDateDivShow = true;
    data.assignMgrStartDateList = 'asOfDate';
    // this.startDate = this.dateFormat(data.startDate);
    // this.startDate = data.startDate;
    // this.startDate = formatDate(data.startDate, 'MM/dd/yyyy', 'en-US');
   }
   if (data.endDate) {
    this.endDateDivShow = true;
    data.assignMgrEndDateList = 'asOfDate';
    // this.assignMgrEndDateListOption = false;
    // this.endDate = data.endDate;
    // this.endDate = formatDate(data.endDate, 'MM/dd/yyyy', 'en-US');
   }
   /* this.mgrName = data.mgrName;
   this.mgrProduct = data.mgrProduct;
   this.managerId = data.managerId;
   this.productId = data.productId; */
   this.editManagerForm = this.formBuilder.group({
    managerId: [''],
    productId: [''],
    managerName: [''],
    managerProduct: [''],
    assignMgrStartDateList: [''],
    startDate: [new Date(data.startDate)],
    assignMgrEndDateList: [''],
    endDate: [new Date(data.endDate)],
    currentDate: ['']
   }, { validator: this.checkDates });

   this.editManagerForm.patchValue({
    // assignMgrStartDateList: 'asOfDate',
    managerName: data.managerName,
    managerProduct: data.managerProduct,
    productId: data.managerId,
    managerId: data.managerId,
    assignMgrStartDateList: data.assignMgrStartDateList,
    // startDate: new Date(data.startDate),
    assignMgrEndDateList: data.assignMgrEndDateList,
    // endDate: new Date(data.endDate),
    // currentDate: this.currentDate
    currentDate: formatDate(this.currentDate, 'MM/dd/yyyy', 'en-US')
   });
  }
 /* formControl = new FormControl('', [
  Validators.required
  // Validators.email,
 ]); */
 /* dateFormat(value: any): Date | null {
  console.log('dateFormat');
  console.log(value)
  if ((typeof value === 'string') && (value.indexOf('-') > -1)) {
    const str = value.split('-');
    const year = Number(str[2]);
    const month = Number(str[1]) - 1;
    const date = Number(str[0]);
    return new Date(year, month, date);
  }
  const timestamp = typeof value === 'number' ? value : Date.parse(value);
  return isNaN(timestamp) ? null : new Date(timestamp);
 } */
 getErrorMessage() {
  // return this.formControl.hasError('required') ? 'Required field' :
  // this.formControl.hasError('email') ? 'Not a valid email' :'';
 }
 submit() {
  // emppty stuff
 }
 onNoClick(): void {
  this.dialogRef.close();
 }
 checkDates(group: FormGroup) {
  console.log('checkDates');
  console.log(group);
  if ((group.controls.startDate.value === undefined || group.controls.startDate.value === null) && group.controls.assignMgrStartDateList.value === 'asOfDate') {
   return { startDateNull : true };
  }
  if ((group.controls.endDate.value === undefined || group.controls.endDate.value === null) && group.controls.assignMgrEndDateList.value === 'asOfDate') {
   return { endDateNull : true };
  }
  if (group.controls.endDate.value < group.controls.startDate.value) {
   return { startDateGTendDate : true };
  }
  if (group.controls.currentDate.value < group.controls.startDate.value) {
   return { startDateGTcurrentDate : true };
  }
  if (group.controls.currentDate.value < group.controls.endDate.value) {
   return { endDateGTcurrentDate : true };
  }
  return null;
 }
 editManager(form) {
  console.log ('in Component - addManager');
  console.log (form.value);
  console.log('Date Validation');
  console.log(this.editManagerForm.hasError('startDateGTendDate'));
  this.submitted = true;
  this.scrDefConst = 'managerEdit';
  this.command = 'managerEdit';
  this.formatType = 'html';
  this.managerName = form.value.managerName;
  this.managerProduct = form.value.managerProduct;
  this.managerId = form.value.managerId;
  this.productId = form.value.productId;
  // this.startDate = form.value.startDate;
  // this.startDate = this.dateFormat(form.value.startDate);
  this.assignMgrStartDateList = form.value.assignMgrStartDateList;
  this.assignMgrEndDateList = form.value.assignMgrEndDateList;
  console.log('assignMgrStartDateList');
  console.log(this.assignMgrStartDateList);
  console.log('assignMgrEndDateList');
  console.log(this.assignMgrEndDateList);
  if (this.assignMgrStartDateList === 'allHistory') {
   this.startDate = '';
  } else {
   this.startDate = formatDate(form.value.startDate, 'MM/dd/yyyy', 'en-US');
  }
  if (this.assignMgrStartDateList === 'current') {
   this.endDate = '';
  } else {
   this.endDate = formatDate(form.value.endDate, 'MM/dd/yyyy', 'en-US');
  }
  console.log('STARTDATE');
  console.log(this.startDate);
  console.log('ENDDATE');
  console.log(this.endDate);
  let advEditFormMapData =  new Map();
  advEditFormMapData.set('scrDefConst', this.scrDefConst);
  advEditFormMapData.set('command', this.command);
  advEditFormMapData.set('formatType', this.formatType);
  advEditFormMapData.set('mgrName', this.managerName);
  advEditFormMapData.set('mgrProduct', this.managerProduct);
  advEditFormMapData.set('assignMgrStartDateList', this.assignMgrStartDateList);
  advEditFormMapData.set('startDate', this.startDate);
  advEditFormMapData.set('assignMgrEndDateList', this.assignMgrEndDateList);
  advEditFormMapData.set('endDate', this.endDate);
  let advEditPromiseRsp = this.appService.editManager(advEditFormMapData);
  // console.log('Component Result - advAddPromiseRsp');
  // console.log(advAddPromiseRsp);
  const data = fromPromise(advEditPromiseRsp);
  console.log('Component Result - data');
  console.log(data);
  data.subscribe (
   (res: any) => {
    // this.advAddMessage = res;
   },
   (err) => console.log(err)
  );
  // }
 }
 startDatePick(form) {
  console.log('in startDatePick');
  console.log(form);
  if (form.value !== 'allHistory') {
   this.startDateDivShow = true;
  } else if (form.value === 'allHistory') {
   this.startDateDivShow = false;
  }
 }
 endDatePick(form) {
  console.log('in endDatePick');
  console.log(form);
  if (form.value !== 'allHistory') {
   this.endDateDivShow = true;
  } else if (form.value === 'allHistory') {
   this.endDateDivShow = false;
  }
 }
}