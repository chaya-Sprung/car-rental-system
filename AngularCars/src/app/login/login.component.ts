import { Component } from '@angular/core';
import { CustomerService, CustomerDTO } from '../Services/customers.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  searchId: string = '';
  customer: CustomerDTO | null = null;
  errorMessage: string = '';
  showModal: boolean = false;

  newCustomer: CustomerDTO = {
    Id: 0,
    firstName: '',
    lastName: '',
    idCity: 1,
    email: '',
    numOfLending: 0,
    codePayment: 1
  };

  constructor(private customerService: CustomerService, private router: Router) {}

  // פונקציית עזר מרכזית לשמירת נתונים - כדי שלא נשכח שום שדה
  private loginUserLocally(id: number, firstName: string) {
    localStorage.setItem('customerId', String(id));
    localStorage.setItem('userName', firstName);
    // אופציונלי: שמירת אובייקט מלא לשימוש עתידי
    localStorage.setItem('currentUser', JSON.stringify({ id, firstName }));
  }

  checkID() {
    const idToSearch = Number(this.searchId.trim());
    if (!idToSearch) {
      this.errorMessage = 'אנא הזן תעודת זהות תקינה';
      return;
    }

    this.customerService.getCustomerById(idToSearch).subscribe({
      next: (res) => {
        // בדיקה שהלקוח קיים (לפי הלוגיקה שלך)
        if (res && res.Id !== 0) {
          this.customer = res;
          this.errorMessage = '';
          this.showModal = false;

          // שמירה ב-localStorage
          this.loginUserLocally(res.Id, res.firstName);

          alert(`שלום ${res.firstName}, זוהית במערכת!`);
          
          setTimeout(() => {
            this.router.navigate(['/cars']);
          }, 500);
        } else {
          this.handleNewUser(idToSearch);
        }
      },
      error: () => {
        this.handleNewUser(idToSearch);
      }
    });
  }

  handleNewUser(id: number) {
    this.customer = null;
    this.errorMessage = 'ID לא נמצא במערכת. הנך מועבר לטופס רישום.';
    this.newCustomer.Id = id; 
    this.showModal = true;
  }

  submitNewCustomer() {
    this.customerService.insertNewCustomer(this.newCustomer).subscribe({
      next: (res) => {
        // כאן התיקון: נשמור את הנתונים מיד לאחר הרישום המוצלח
        alert('נרשמת בהצלחה!');
        
        this.loginUserLocally(this.newCustomer.Id, this.newCustomer.firstName);

        this.showModal = false;
        setTimeout(() => {
          this.router.navigate(['/cars']);
        }, 500);
      },
      error: (err) => {
        console.error("שגיאה ברישום:", err);
        alert('שגיאה ברישום. וודא שכל השדות תקינים.');
      }
    });
  }

  closeModal() {
    this.showModal = false;
    this.errorMessage = '';
  }
}