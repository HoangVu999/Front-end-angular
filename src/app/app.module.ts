import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { CateListComponent } from './screens/admin/category/cate-list/cate-list.component';
import { CateEditComponent } from './screens/admin/category/cate-edit/cate-edit.component';
import { CateNewComponent } from './screens/admin/category/cate-new/cate-new.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BookListComponent } from './screens/admin/book/book-list/book-list.component';
import { BookNewComponent } from './screens/admin/book/book-new/book-new.component';
import { BookEditComponent } from './screens/admin/book/book-edit/book-edit.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import { AuthorListComponent } from './screens/admin/author/author-list/author-list.component';
import { AuthorNewComponent } from './screens/admin/author/author-new/author-new.component';
import { AuthorEditComponent } from './screens/admin/author/author-edit/author-edit.component';
import { BookDetailComponent } from './screens/client/book-detail/book-detail.component';
import { ListBookComponent } from './screens/client/list-book/list-book.component';
import { CateListBookComponent } from './screens/client/cate-list-book/cate-list-book.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    MatFormFieldModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud'),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ClientLayoutComponent,
    CateListComponent,
    CateEditComponent,
    CateNewComponent,
    BookListComponent,
    BookNewComponent,
    BookEditComponent,
    AuthorListComponent,
    AuthorNewComponent,
    AuthorEditComponent,
    BookDetailComponent,
    ListBookComponent,
    CateListBookComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
