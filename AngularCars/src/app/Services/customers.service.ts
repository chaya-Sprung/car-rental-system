import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CustomerDTO {
  Id: number;
  firstName: string;
  lastName: string;
  idCity: number;
  email: string;
  numOfLending: number;
  codePayment: number;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  // כתובת ה-API כפי שמוגדרת ב-C#
  private baseUrl: string = "https://localhost:44372/api/customers";

  constructor(private http: HttpClient) {}

  // חיפוש לקוח - שימי לב לשם getcustemerbyid כפי שמופיע בשרת
  getCustomerById(id: number): Observable<CustomerDTO> {
    return this.http.get<CustomerDTO>(`${this.baseUrl}/getcustemerbyid/${id}`);
  }

  // הוספת לקוח - תואם ל-Route("insertcustomer")
  insertNewCustomer(customer: CustomerDTO): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/insertcustomer`, customer);
  }
}