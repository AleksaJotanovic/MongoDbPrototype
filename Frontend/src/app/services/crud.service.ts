import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from 'src/data-types';
import { PcComponent } from 'src/data-types';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  students$ = new BehaviorSubject<Student[]>([]);

  constructor(private http: HttpClient) { }

  // Get All Students.
  getStudents() {
    return this.http.get<Student[]>("http://localhost:3000/api/students");
  }
  getAllStudents() {
    this.getStudents().subscribe((res: any) => this.students$.next(res.data));
  }

  // Adding a student.
  addStudent(student: any) {
    this.http.post("http://localhost:3000/api/students/add", student).subscribe(() => {
      this.getAllStudents();
    });
  }
  uploadStudentImage(file: FormData) {
    return this.http.post('http://localhost:3000/upload-image', file);
  }

  // Change, Edit, Delete students.
  updateStudent(student: any, _id: any) {
    this.http.put(`http://localhost:3000/api/students/update/${_id}`, student).subscribe(() => {
      this.getAllStudents();
    });
  }
  deleteStudent(student: any) {
    this.http.delete(`http://localhost:3000/api/students/delete/${student._id}`).subscribe(() => {
      this.getAllStudents();
    });
  }


  // PcComponent crud//
  componentGet() {
    return this.http.get<PcComponent[]>('http://localhost:3000/api/components/get');
  }
  componentPost(component: PcComponent) {
    return this.http.post('http://localhost:3000/api/components/post', component);
  }
  componentPut(component: PcComponent) {
    return this.http.put(`http://localhost:3000/api/components/put/${component._id}`, component);
  }
  componentDelete(id: number) {
    return this.http.delete(`http://localhost:3000/api/components/delete/${id}`);
  }
}
