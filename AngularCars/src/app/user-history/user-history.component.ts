import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentsService, RentDTO } from '../Services/rents.service';

@Component({
  selector: 'app-user-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-history.component.html',
  styleUrl: './user-history.component.css'
})
export class UserHistoryComponent implements OnInit {
  userRents: RentDTO[] = [];
  isLoading: boolean = true;
  userName: string = '';

  constructor(private rentsService: RentsService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

 loadHistory() {
  // 1. שינינו מ-'user' ל-'currentUser' כי ככה זה שמור אצלך!
  const userData = localStorage.getItem('currentUser'); 
  
  if (userData) {
    const user = JSON.parse(userData);
    this.userName = user.firstName || 'לקוח';
    
    // 2. כאן אנחנו לוקחים את ה-ID. 
    // אם השרת מחזיר ריק, סימן שצריך לשמור ב-Login את ה-ID האוטומטי מה-DB ולא ת.ז
    const customerId = user.id;

    this.rentsService.getRentsByCustomerId(customerId).subscribe({
      next: (data) => {
        console.log("הנתונים שהגיעו מהשרת:", data);
        this.userRents = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('שגיאה:', err);
        this.isLoading = false;
      }
    });
  } else {
    this.isLoading = false;
  }
}

}