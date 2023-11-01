import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { PcComponent } from 'src/data-types';
import { PrototypeService } from '../services/prototype.service';
import { v4 as uuidv4 } from 'uuid'

@Component({
  selector: 'keyvalue-inputs',
  templateUrl: './keyvalue-inputs.component.html',
  styleUrls: ['./keyvalue-inputs.component.css']
})
export class KeyvalueInputsComponent implements OnInit {

  componentForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    category: new FormControl(''),
    manufacturer: new FormControl(''),
    specifications: new FormArray([this.putSpecifications()]),
    description: new FormControl('')
  });

  components: PcComponent[] = [];

  constructor(private prototypeService: PrototypeService) { }

  ngOnInit(): void {
    this.prototypeService.components$.subscribe({
      next: (value) => {
        this.components = value;
        console.log('Should be components: ', this.components)
      },
      error: (err) => console.log(err)
    });
  }

  putSpecifications() {
    return new FormGroup({
      spec: new FormControl(''),
      value: new FormControl('')
    });
  }

  getSpecifications() {
    return this.componentForm.get('specifications') as FormArray;
  }

  newSpecification() {
    this.getSpecifications().push(this.putSpecifications());
  }

  removeSpecification(i: number) {
    this.getSpecifications().removeAt(i);
  }

  getFormValue() {
    const componentBody: PcComponent = {
      ...this.componentForm.value, _id: uuidv4()
    }
    this.prototypeService.addComponent(componentBody);
  }

}
