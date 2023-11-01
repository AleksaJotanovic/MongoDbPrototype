import { Component, OnInit } from '@angular/core';
import { CrudService } from './services/crud.service';
import { PrototypeService } from './services/prototype.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private crud: CrudService, private ptService: PrototypeService) { }

  ngOnInit(): void {
    this.crud.getAllStudents();
    this.ptService.initComponents();
  }


}
