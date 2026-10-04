import {Component, OnInit, signal} from '@angular/core';
import {TableModule} from 'primeng/table';
import {Bill} from '../models/billing.model';
import {BillingService} from '../services/billing.service';
import {BillDetailsComponent} from '../bill-details.component/bill-details.component';

@Component({
  selector: 'app-bill-list',
  imports: [
    TableModule,
    BillDetailsComponent
  ],
  templateUrl: './bill-list.component.html',
  styleUrl: './bill-list.component.scss',
})
export class BillListComponent implements OnInit{

  bills=signal<Bill[]>([]);
  billDetail=signal<Bill|null>(null);

  constructor(private billingService:BillingService){}

  ngOnInit() {
    this.getBills();
  }

  getBills() {
    this.billingService.getAllBills()
      .subscribe(bills => this.bills.set(bills));
  }


  getBillDetails(id:string) {
    this.billDetail.set(null);
    this.billingService.getBillById(id)
      .subscribe(bill => this.billDetail.set(bill));


  }
}
