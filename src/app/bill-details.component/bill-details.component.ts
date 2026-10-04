import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Bill,  ProductItem} from '../models/billing.model';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-bill-details',
  imports: [
    ReactiveFormsModule,
    DecimalPipe
  ],
  templateUrl: './bill-details.component.html',
  styleUrl: './bill-details.component.scss',
})
export class BillDetailsComponent  implements OnChanges,OnInit{

  @Input()
  bill:Bill|null=null;
  billingForm!:FormGroup;

  constructor(private fb:FormBuilder) {
    this.initialiseForm();
  }

  ngOnChanges(): void {
    if(this.bill){
      this.initFormWithBillValues();
    }
  }

  ngOnInit() {
  }

  initialiseForm(){
    this.billingForm=this.fb.group({
      billingDate:[""],
      customerName:[""],
      productItems:this.fb.array([]),
    })
  }

  createItem(item?: ProductItem): FormGroup {
    return this.fb.group({
      productName: [item?.product?.name ??''],
      quantity:    [item?.quantity ?? 0],
      price:       [item?.price ?? 0],
      discount:    [item?.discount ?? 0],
    });
  }

  get productItems(): FormArray {
    return this.billingForm.get('productItems') as FormArray;
  }


  get totalAmount(): number {
    return this.productItems.value.reduce(
      (acc: number, i: any) => acc + i.quantity * i.price * (1 - i.discount / 100), 0);
  }

  initFormWithBillValues(){
    this.billingForm.patchValue({
      billingDate:this.bill?.billingDate,
      customerName:this.bill?.customer.name
    })

    this.productItems.clear();
    this.bill?.productItems.forEach(item=>this.productItems.push(this.createItem(item)));

  }

}
