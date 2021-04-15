import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../../../services/category.service';
import {Category} from '../../../models/category';

@Component({
  selector: 'app-cate-list-book',
  templateUrl: './cate-list-book.component.html',
  styleUrls: ['./cate-list-book.component.css']
})
export class CateListBookComponent implements OnInit {
  cateId: string;
  cate: Category[] = [];
  constructor(private route: ActivatedRoute,
              private cateService: CategoryService) { }

  async ngOnInit() {
    await this.route.params.subscribe(params => {
      this.cateId = params['cateId'];
    });
    await this.cateService.getAllId(this.cateId).subscribe(data => {
      this.cate = data;
    })
  }
}
