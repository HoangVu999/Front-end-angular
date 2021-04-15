import { Component, OnInit } from '@angular/core';
import {Author} from '../../../../models/author';
import {AuthorService} from '../../../../services/author.service';
import {BookService} from '../../../../services/book.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
  authors: Author[] = [];
  constructor(private authorService: AuthorService,
              private bookService: BookService) { }

  ngOnInit(): void {
    this.getAuthorList();
  }
  getAuthorList() {
    this.authorService.getAll().subscribe(data => {
      this.authors = data;
    });
  }
  async remove(id: any) {
    const listCate: any = await this.authorService.findById(id).toPromise()
    if (listCate.books.length) {
      const ids = listCate.books.map(item => item.id);
      await this.bookService.removeMultiple(ids).toPromise()
    }
    await this.authorService.remove(listCate.id).toPromise()
    this.authors = this.authors.filter((v) => {
      return v.id !== listCate.id
    })
  }
}
