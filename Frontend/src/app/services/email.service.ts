import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendEmail(name: string, email: string, message: string, price: number, quantity: number, date: Date, mailContent: string) {
    const data = { name: name, email: email, message: message, price: price, quantity: quantity, date: date, mailContent };
    return this.http.post('http://localhost:3000/send-email', data);
  }
}
