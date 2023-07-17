import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseUrl = 'https://zomapp-e31x.onrender.com'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  getMenuItems() {
    const url = `${this.baseUrl}/menu/get`; // Replace with the menu API endpoint URL
    return this.http.get(url);
  }
}
