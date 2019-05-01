import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InnovationsPage } from './innovations.page';

import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

const routes: Routes = [
  {
    path: '',
    component: InnovationsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InnovationsPage, SafeHtmlPipe]
})
export class InnovationsPageModule {}
