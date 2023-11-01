import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { PcComponent } from 'src/data-types';

@Component({
  selector: 'dynamic-fields',
  templateUrl: './dynamic-fields.component.html',
  styleUrls: ['./dynamic-fields.component.css']
})
export class DynamicFieldsComponent implements OnInit {

  studentForm: FormGroup = new FormGroup({
    name: new FormControl(""),
    class: new FormControl(""),
    age: new FormControl(""),
    subjects: new FormArray([this.putNewSubject()])
  });

  constructor() { }

  ngOnInit(): void {
  }

  putNewSubject() {
    return new FormGroup({
      subject: new FormControl(""),
      marks: new FormControl(""),
    });
  }

  subjectsArray() {
    return this.studentForm.get('subjects') as FormArray;
  }

  addNewSubject() {
    this.subjectsArray().push(this.putNewSubject());
  }

  removeNewSubject(j: number) {
    this.subjectsArray().removeAt(j);
  }

  getFormData() {
    console.log(this.studentForm.value);
  }

}