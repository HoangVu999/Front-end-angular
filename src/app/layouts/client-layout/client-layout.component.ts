import { Component, OnInit } from '@angular/core';
import {Category} from '../../models/category';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent implements OnInit {
  cates: Category[] = [];

  constructor(private cateService: CategoryService) { }

  ngOnInit(): void {
    this.getCateList();
  }
  getCateList() {
    this.cateService.getAll().subscribe(data => {
      this.cates = data;
    });
  }
}
