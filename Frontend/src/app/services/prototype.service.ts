import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PcComponent } from 'src/data-types';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class PrototypeService {

  components$ = new BehaviorSubject<PcComponent[]>([]);

  constructor(private crud: CrudService) { }

  initComponents() {
    this.crud.componentGet().subscribe((data) => this.components$.next(data));
  }

  addComponent(component: PcComponent) {
    this.crud.componentPost(component).subscribe(() => this.initComponents());
  }

  updateComponent(component: PcComponent) {
    this.crud.componentPut(component).subscribe(() => this.initComponents());
  }

  deleteComponent(id: number) {
    this.crud.componentDelete(id).subscribe(() => this.initComponents());
  }
}
