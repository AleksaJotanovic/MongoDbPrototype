import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})
export class AccountingComponent implements OnInit {

  @ViewChild('emailContent', { static: false }) emailContent!: ElementRef;

  name: string = '';
  email: string = '';
  message: string = '';
  price: number = 0;
  quantity: number = 0;
  date: Date = new Date();

  constructor(private emailService: EmailService) { }

  ngOnInit(): void { }

  // Functionalities
  onSubmit() {
    let mailContent: string = this.emailContent.nativeElement.innerHTML;

    this.emailService.sendEmail(this.name, this.email, this.message, this.price, this.quantity, this.date, mailContent).subscribe(() => {
      console.log("Email sent successfully!");
    });
  }

}
