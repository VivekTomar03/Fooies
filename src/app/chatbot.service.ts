import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private baseUrl = 'https://zomapp-e31x.onrender.com'; // Replace with your chatbot API base URL

  constructor(private http: HttpClient) {}

  sendMessage(message:any) {
    const url = `${this.baseUrl}/chat`; // Replace with the chatbot API endpoint URL
    const body = {
      message: message
    };
    return this.http.post(url, body);
  }
}
