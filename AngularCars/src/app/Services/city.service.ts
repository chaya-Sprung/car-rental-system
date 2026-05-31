import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface CityDTO {
  cityCode: number;
  cityName: string;
}

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private baseUrl: string = "https://localhost:44372/api/cities";

  constructor(private http: HttpClient) {}

  // Get all cities from server
  getAllCities(): Observable<CityDTO[]> {
    return this.http.get<CityDTO[]>(`${this.baseUrl}/getall`);
  }

  // Get a specific city by ID
  getCityById(cityId: number): Observable<CityDTO> {
    return this.http.get<CityDTO>(`${this.baseUrl}/getcitybyid/${cityId}`);
  }

  // Add a new city
  addCity(city: CityDTO): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addcity`, city);
  }
}
