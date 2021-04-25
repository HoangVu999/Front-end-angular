import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {ClientLayoutComponent} from './layouts/client-layout/client-layout.component';
import {ListBookComponent} from './screens/client/list-book/list-book.component';
import {BookDetailComponent} from './screens/client/book-detail/book-detail.component';
import {CateListBookComponent} from './screens/client/cate-list-book/cate-list-book.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        component: ListBookComponent,
      },
      {
        path: 'book-detail/:bookId',
        component: BookDetailComponent
      },
      {
        path: 'cateList/:cateId',
        component: CateListBookComponent
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
    {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
