import { Component, OnInit } from '@angular/core';
import {BookService} from '../../../../services/book.service';
import {Book} from '../../../../models/book';
import {ORDER_DATA} from '../../../../models/order-data';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  orderData: any[] = ORDER_DATA;
  filterObject = {
    orderBy: '1',
    keyword: ''
  }
  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    // this.getBookList();
    this.search();
  }
  search() {
    this.bookService.getAll(this.filterObject).subscribe(data => {
      this.books = data;
    })
  }
  // getBookList() {
  //   // @ts-ignore
  //   this.bookService.getAll().subscribe(data => {
  //     this.books = data;
  //   });
  // }

   remove(id: any) {
    this.bookService.findById(id).subscribe(book => {
      this.bookService.removeBook(book.id).subscribe(data => {
        this.books = this.books.filter((v) => {
          return v.id !== id
        })
      }
      )
    })
  }
}
