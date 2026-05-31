import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentDTO, PaymentService } from '../Services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  
  newPayment: PaymentDTO = {
    paymentCode: 0,
    creditCard: '',
    validit: '',
    cvc: 0
  };

  errorMessage: string = '';
  isProcessing: boolean = false;

  constructor(private paymentService: PaymentService, private router: Router) {}

  submitPayment() {
    if (!this.newPayment.creditCard || !this.newPayment.validit || !this.newPayment.cvc) {
      this.errorMessage = "נא למלא את כל פרטי האשראי";
      return;
    }

    this.isProcessing = true;
    console.log("מבצע תשלום...", this.newPayment);

    this.paymentService.addPayment(this.newPayment).subscribe({
      next: (res) => {
        if (res) {
          alert("התשלום בוצע בהצלחה! נסיעה טובה.");
          this.router.navigate(['/home']); // או לאן שתרצי שיחזור
        } else {
          this.errorMessage = "התשלום נדחה על ידי השרת.";
        }
        this.isProcessing = false;
      },
      error: (err) => {
        this.errorMessage = "שגיאה בתקשורת עם השרת.";
        this.isProcessing = false;
        console.error(err);
      }
    });
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}