import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface מסונכרן ב-100% עם ה-DTO ב-C#
export interface RentDTO {
  rentCode?: number;   // בשרת זה rensCode, ב-DTO זה rentCode
  customerId: number;
  carCode: number;
  beginDate: string;   // מומלץ להשתמש ב-string (פורמט YYYY-MM-DD) עבור ה-Input
  finishDate: string;
  rentGoal: string;
}

@Injectable({
  providedIn: 'root'
})
export class RentsService {
  // ודאי שה-URL הזה מדויק ושהשרת רץ
  private baseUrl: string = "https://localhost:44372/api/rents";

  constructor(private http: HttpClient) {}

  // 1. שליפת כל ההשכרות
  getAllRents(): Observable<RentDTO[]> {
    return this.http.get<RentDTO[]>(`${this.baseUrl}/getallrents`);
  }

  // 2. שליפת השכרות לפי קוד רכב (לבדיקת תאריכים תפוסים)
  getRentsByCarCode(carCode: number): Observable<RentDTO[]> {
    return this.http.get<RentDTO[]>(`${this.baseUrl}/getrentsbycarcode/${carCode}`);
  }

  // 3. שליפת היסטוריה לפי קוד לקוח (תוקן ב-BL לחפש לפי לקוח!)
  getRentsByCustomerId(customerId: number): Observable<RentDTO[]> {
    return this.http.get<RentDTO[]>(`${this.baseUrl}/getrentsbycustomerid/${customerId}`);
  }

  // 4. הוספת השכרה חדשה - הפעולה החשובה ביותר
  addRent(rent: RentDTO): Observable<boolean> {
    // שליחת האובייקט כ-JSON בתוך ה-Body של הבקשה
    return this.http.post<boolean>(`${this.baseUrl}/add`, rent);
  }

  // 5. עדכון השכרה
  updateRent(rent: RentDTO): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/update`, rent);
  }

  // 6. בדיקת רכבים פנויים (שימוש בתאריכים ב-URL כפי שהגדרנו ב-Controller)
  getAvailableCars(start: string, end: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getavailablecarsbetweendates/${start}/${end}`);
  }
}