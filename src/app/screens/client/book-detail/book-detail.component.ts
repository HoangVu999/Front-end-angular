import { Component, OnInit } from '@angular/core';
import {Book} from '../../../models/book';
import {ActivatedRoute} from '@angular/router';
import {BookService} from '../../../services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  bookId: string;
  book: Book[] = [];
  constructor(private route: ActivatedRoute,
              private bookService: BookService) { }

  async ngOnInit() {
    await this.route.params.subscribe(params => {
      this.bookId = params['bookId'];
    });
    await this.bookService.findById(this.bookId).subscribe(data => {
      this.book = data;
    })
  }
}
