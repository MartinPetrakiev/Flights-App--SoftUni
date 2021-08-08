import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import {  FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    RegisterComponent,
    LogInComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    UserRoutingModule,
    HttpClientModule,
    FormsModule,

  ]
})
export class UserModule { }
