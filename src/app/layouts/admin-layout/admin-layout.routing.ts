import { Routes } from '@angular/router';
import {CateListComponent} from '../../screens/admin/category/cate-list/cate-list.component';
import {CateNewComponent} from '../../screens/admin/category/cate-new/cate-new.component';
import {CateEditComponent} from '../../screens/admin/category/cate-edit/cate-edit.component';
import {BookListComponent} from '../../screens/admin/book/book-list/book-list.component';
import {BookNewComponent} from '../../screens/admin/book/book-new/book-new.component';
import {BookEditComponent} from '../../screens/admin/book/book-edit/book-edit.component';
import {AuthorListComponent} from '../../screens/admin/author/author-list/author-list.component';
import {AuthorNewComponent} from '../../screens/admin/author/author-new/author-new.component';
import {AuthorEditComponent} from '../../screens/admin/author/author-edit/author-edit.component';

export const AdminLayoutRoutes: Routes = [
    {
        path: 'category',
        component: CateListComponent,
    },
    {
        path: 'category/add-new',
        component: CateNewComponent,
    },
    {
        path: 'category/edit/:id',
        component: CateEditComponent,
    },
    {
        path: 'book',
        component: BookListComponent
    },
    {
        path: 'book/add-new',
        component: BookNewComponent,
    },
    {
        path: 'book/edit/:id',
        component: BookEditComponent,
    },
    {
        path: 'author',
        component: AuthorListComponent
    },
    {
        path: 'author/add-new',
        component: AuthorNewComponent,
    },
    {
        path: 'author/edit/:id',
        component: AuthorEditComponent,
    },
];
