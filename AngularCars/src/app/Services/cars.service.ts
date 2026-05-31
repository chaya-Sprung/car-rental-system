import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CarsDTO {
  carCode: number;
  numPlace: number;
  level: number;
  priceOfDay: number;
  priceOfWeek: number;
}

@Injectable({ providedIn: 'root' })
export class CarsService {
  // וודאי שהפורט 44372 אכן פעיל כשה-API רץ
  private readonly url = "https://localhost:44372/api/cars/";

  constructor(private bhttp: HttpClient) { }

  getAll(): Observable<CarsDTO[]> {
    return this.bhttp.get<CarsDTO[]>(this.url + 'getallcars');
  }

  /**
   * שליחת סינון לשרת.
   * שימי לב: הסדר ב-URL חייב להתאים ל-[Route] ב-Controller:
   * {numMekomot}/{maxRama}/{maxPrice}
   */
  getByCriteria(numPlace: number, level: number, maxPrice: number): Observable<CarsDTO[]> {
    // שימוש ב-0 כברירת מחדל אם הערך לא הוזן
    const p = numPlace ?? 0;
    const l = level ?? 0;
    const m = maxPrice ?? 0;

    // בניית ה-URL לפי הסדר שהגדרת ב-Controller
    const fullUrl = `${this.url}getcarsbycriteria/${p}/${l}/${m}`;
    
    console.log("Calling API with URL:", fullUrl); // עוזר מאוד לדיבאג
    return this.bhttp.get<CarsDTO[]>(fullUrl);
  }

  delete(car: CarsDTO): Observable<boolean> {
    // ב-Web API 2 לעיתים ה-POST מצפה לאובייקט בגוף הבקשה ללא ציון הפרמטר ב-URL
    return this.bhttp.post<boolean>(this.url + 'delete', car);
  }
}