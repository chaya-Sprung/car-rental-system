import { Component, OnInit } from '@angular/core';
import { CarsDTO, CarsService } from '../Services/cars.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RentCarComponent } from '../rent-car/rent-car.component';
// ייבוא קומפוננטת ההיסטוריה - וודא שהנתיב נכון
import { UserHistoryComponent } from '../user-history/user-history.component'; 

@Component({
  selector: 'app-desplay-cars',
  standalone: true,
  imports: [CommonModule, FormsModule, RentCarComponent, UserHistoryComponent],
  templateUrl: './desplay-cars.component.html',
  styleUrl: './desplay-cars.component.css'
})
export class DesplayCarsComponent implements OnInit {
  cars: CarsDTO[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  // ניהול מודל הזמנה
  selectedCarForRent: CarsDTO | null = null;
  isRentModalOpen: boolean = false;

  // ניהול מודל היסטוריה
  isHistoryModalOpen: boolean = false;

  filterNumPlace: number = 5;
  filterLevel: number = 10;
  filterMaxPrice: number = 1100;

  constructor(private carsService: CarsService) {}

  ngOnInit() {
    this.loadAllCars();
  }

  // פונקציות מודל הזמנה
  openRentDialog(car: CarsDTO) {
    this.selectedCarForRent = car;
    this.isRentModalOpen = true;
  }

  closeRentDialog() {
    this.isRentModalOpen = false;
    this.selectedCarForRent = null;
  }

  // פונקציות מודל היסטוריה
  openHistoryDialog() {
    this.isHistoryModalOpen = true;

  alert("הכפתור נלחץ!"); // <--- זה יקפוץ על המסך
  this.isHistoryModalOpen = true;

  }

  closeHistoryDialog() {
    this.isHistoryModalOpen = false;
  }

  loadAllCars() {
    this.isLoading = true;
    this.errorMessage = '';
    this.carsService.getAll().subscribe({
      next: (data) => {
        this.cars = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'שגיאה בטעינת הרכבים';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  applyFilters() {
    this.isLoading = true;
    this.errorMessage = '';
    this.carsService.getByCriteria(this.filterNumPlace, this.filterLevel, this.filterMaxPrice)
      .subscribe({
        next: (data) => {
          this.cars = [...data];
          this.isLoading = false;
          if (this.cars.length === 0) {
            this.errorMessage = 'לא נמצאו רכבים העונים לקריטריונים';
          }
        },
        error: (err) => {
          this.errorMessage = 'לא ניתן לבצע סינון כרגע';
          this.isLoading = false;
        }
      });
  }

  onDelete(car: CarsDTO) {
    if (confirm(`האם למחוק את רכב ${car.carCode}?`)) {
      this.carsService.delete(car).subscribe(success => {
        if (success) this.loadAllCars();
      });
    }
  }

  reset() {
    this.filterNumPlace = 5;
    this.filterLevel = 10;
    this.filterMaxPrice = 1100;
    this.loadAllCars();
  }
}
