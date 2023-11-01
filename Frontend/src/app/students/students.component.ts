import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { Student } from 'src/data-types';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  @ViewChild('studentForm') studentForm!: NgForm

  students: Student[] = [];
  isStudentsLoaded: boolean = false;
  isUpdateFormActive: boolean = false;
  id: string = '';

  values: any[] = [];

  constructor(private crud: CrudService) { }

  ngOnInit(): void {
    this.initStudents();
  }

  initStudents() {
    this.crud.students$.subscribe({
      next: (data) => this.students = data,
      error: (err) => console.log('Error while initializing students array: ', err),
      complete: () => console.log('Students array init successfull :)')
    });
  }

  // Functionalities
  register() {
    const imageBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('file', imageBlob);
    this.crud.uploadStudentImage(file).subscribe((res: any) => {
      let studentValue: Student = this.studentForm.value;
      let bodyData = { name: studentValue.name, course: studentValue.course, fee: studentValue.fee, image: `assets/${res.data}` };
      this.crud.addStudent(bodyData);
    });
  }

  update(data: Student) {
    this.studentForm.setValue({ name: data.name, course: data.course, fee: data.fee });
    this.id = data._id
  }
  updateRecords() {
    let bodyData = {
      name: this.studentForm.value.name,
      course: this.studentForm.value.course,
      fee: this.studentForm.value.fee
    };
    this.crud.updateStudent(bodyData, this.id);
  }

  // Main functions
  save() {
    if (this.id === '') {
      this.register();
    } else {
      this.updateRecords();
    }
  }

  delete(data: any) {
    this.crud.deleteStudent(data);
  }


  //Values
  removeValue(i: number) {
    this.values.splice(i, 1);
  }

  addValue() {
    this.values.push({ value: '' });
  }

  printValues() {
    console.log(this.values);
  }

}
