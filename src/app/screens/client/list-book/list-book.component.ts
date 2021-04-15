import { Component, OnInit } from '@angular/core';
import {Book} from '../../../models/book';
import {BookService} from '../../../services/book.service';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {
  bookList: Book[] = [];
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getBookList();
  }
  getBookList() {
    this.bookService.getAllBook().subscribe(data => {
      this.bookList = data;
    })
  }
}
