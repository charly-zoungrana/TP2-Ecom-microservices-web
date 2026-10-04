import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Bill} from '../models/billing.model';

@Injectable(
  {providedIn: 'root'}
)

export class BillingService {

  constructor(private http:HttpClient) { }

  private baseUrl="http://localhost:8888/BILLING-SERVICE/api"

  getAllBills():Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.baseUrl}/bills`);
  }

  getBillById(id:String):Observable<Bill> {
    return this.http.get<Bill>(`${this.baseUrl}/bills/${id}`);
  }

}
