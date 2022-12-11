import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';

const MatImports=[MatCardModule]


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path:'',
    component:HomeComponent}
    ]),
    ...MatImports

  ],
})
export class HomeModule { }