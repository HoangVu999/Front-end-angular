import { Component, OnInit } from '@angular/core';
import {Category} from '../../../../models/category';
import {CategoryService} from '../../../../services/category.service';
import {BookService} from '../../../../services/book.service';

@Component({
  selector: 'app-cate-list',
  templateUrl: './cate-list.component.html',
  styleUrls: ['./cate-list.component.css']
})
export class CateListComponent implements OnInit {
  cates: Category[] = [];

  constructor(private cateService: CategoryService,
              private bookService: BookService) {
  }

  ngOnInit(): void {
    this.getCateList();
  }

  getCateList() {
    this.cateService.getAll().subscribe(data => {
      this.cates = data;
    });
  }

  async remove(id: any) {
    const listCate: any = await this.cateService.findById(id).toPromise()
    if (listCate.books.length) {
      const ids = listCate.books.map(item => item.id);
      await this.bookService.removeMultiple(ids).toPromise()
    }
    await this.cateService.remove(listCate.id).toPromise()
    this.cates = this.cates.filter((v) => {
      return v.id !== listCate.id
    })
  }
}
