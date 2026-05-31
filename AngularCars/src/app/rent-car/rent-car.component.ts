import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RentDTO, RentsService } from '../Services/rents.service';
import { CarsDTO } from '../Services/cars.service';
import { Router } from '@angular/router'; // <--- הוספת הראוטר לניווט

@Component({
  selector: 'app-rent-car',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rent-car.component.html',
  styleUrls: ['./rent-car.component.css']
})
export class RentCarComponent implements OnInit {
  @Input() selectedCar!: CarsDTO; 
  @Output() close = new EventEmitter<void>();

  existingRents: RentDTO[] = [];
  errorMessage: string = '';
  
  newRent: RentDTO = {
    rentCode: 0,
    customerId: 0,
    carCode: 0,
    beginDate: '',
    finishDate: '',
    rentGoal: ''
  };

  // הוספת הראוטר כאן ב-Constructor
  constructor(private rentsService: RentsService, private router: Router) {}

  ngOnInit() {
    const savedId = localStorage.getItem('customerId');
    
    if (savedId && savedId !== 'undefined') {
      this.newRent.customerId = Number(savedId);
      console.log("הלקוח המזוהה הוא: " + this.newRent.customerId);
    } else {
      this.errorMessage = "שגיאה: אינך מחובר למערכת! נא להתחבר מחדש.";
    }

    if (this.selectedCar) {
      this.newRent.carCode = this.selectedCar.carCode;
      this.loadReservedDates();
    }
  }

  loadReservedDates() {
    this.rentsService.getRentsByCarCode(this.selectedCar.carCode).subscribe({
      next: (data) => {
        this.existingRents = data;
        console.log("תאריכים תפוסים נטענו:", data);
      },
      error: (err) => console.error("שגיאה בטעינת תאריכים", err)
    });
  }

  isRangeAvailable(start: string, end: string): boolean {
    const s = new Date(start);
    const e = new Date(end);
    if (s > e) return false;

    return !this.existingRents.some(rent => {
      const rentStart = new Date(rent.beginDate);
      const rentEnd = new Date(rent.finishDate);
      return (s <= rentEnd && e >= rentStart);
    });
  }

  saveBooking() {
    this.errorMessage = '';

    if (this.newRent.customerId === 0) {
      this.errorMessage = "לא ניתן לבצע הזמנה ללא זיהוי לקוח.";
      return;
    }

    if (!this.newRent.beginDate || !this.newRent.finishDate || !this.newRent.rentGoal) {
      this.errorMessage = "נא למלא את כל השדות";
      return;
    }

    if (!this.isRangeAvailable(this.newRent.beginDate, this.newRent.finishDate)) {
      this.errorMessage = "הרכב תפוס בתאריכים הנבחרים";
      return;
    }

    const rentPayload: RentDTO = {
      rentCode: 0,
      carCode: Number(this.selectedCar.carCode),
      customerId: Number(this.newRent.customerId),
      beginDate: this.newRent.beginDate,
      finishDate: this.newRent.finishDate,
      rentGoal: this.newRent.rentGoal
    };

    console.log("שולח הזמנה לשרת:", rentPayload);

    this.rentsService.addRent(rentPayload).subscribe({
      next: (success) => {
        if (success) {
          // --- השינוי המרכזי כאן ---
          alert("ההזמנה נשמרה בהצלחה! עובר לעמוד תשלום...");
          this.close.emit(); // סוגר את המודאל הנוכחי
          this.router.navigate(['/payment']); // מנווט לעמוד התשלום
        } else {
          this.errorMessage = "השרת סירב לשמור. ודא שהלקוח קיים ב-Database.";
        }
      },
      error: (err) => {
        this.errorMessage = "שגיאה בתקשורת עם השרת.";
        console.error(err);
      }
    });
  }

  onCancel() {
    this.close.emit();
  }
}