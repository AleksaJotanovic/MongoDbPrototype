import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { AccountingComponent } from './accounting/accounting.component';
import { KeyvalueInputsComponent } from './keyvalue-inputs/keyvalue-inputs.component';
import { DynamicFieldsComponent } from './dynamic-fields/dynamic-fields.component';

const routes: Routes = [
  { path: '', component: StudentsComponent },
  { path: 'accounting', component: AccountingComponent },
  { path: 'keyvalue', component: KeyvalueInputsComponent },
  { path: 'dynamic-inputs', component: DynamicFieldsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
