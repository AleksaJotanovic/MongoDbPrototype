import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { AccountingComponent } from './accounting/accounting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileUploaderComponent } from './accounting/file-uploader/file-uploader.component';
import { SecondUploaderComponent } from './accounting/file-uploader/second-uploader/second-uploader.component';
import { DynamicFieldsComponent } from './dynamic-fields/dynamic-fields.component';
import { KeyvalueInputsComponent } from './keyvalue-inputs/keyvalue-inputs.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    AccountingComponent,
    FileUploaderComponent,
    SecondUploaderComponent,
    DynamicFieldsComponent,
    KeyvalueInputsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
