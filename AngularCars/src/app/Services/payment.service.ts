import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PaymentDTO {
  paymentCode: number;
  creditCard: string;
  validit:string;
  cvc:number;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl: string = "https://localhost:44372/api/payments";

  constructor(private http: HttpClient) {}

  // Get all payment methods from server
  getAllPayments(): Observable<PaymentDTO[]> {
    return this.http.get<PaymentDTO[]>(`${this.baseUrl}/getall`);
  }

  // Get a specific payment method by ID
  getPaymentById(paymentId: number): Observable<PaymentDTO> {
    return this.http.get<PaymentDTO>(`${this.baseUrl}/getpaymentbyid/${paymentId}`);
  }

  // Add a new payment method
 // Add a new payment method
addPayment(payment: PaymentDTO): Observable<any> {
  // שיניתי מ-addpayment ל-add
  return this.http.post<any>(`${this.baseUrl}/add`, payment);
}
}
