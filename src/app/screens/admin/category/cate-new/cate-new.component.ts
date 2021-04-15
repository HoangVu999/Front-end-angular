import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../../../services/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cate-new',
  templateUrl: './cate-new.component.html',
  styleUrls: ['./cate-new.component.css']
})
export class CateNewComponent implements OnInit {
  cateForm: FormGroup;
  constructor(private cateService: CategoryService,
              private router: Router) {
    this.cateForm = this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    return new FormGroup({
      name: new FormControl('', [
          Validators.required,
          Validators.minLength(4)
      ])
    });
  }
  get f() {
    return this.cateForm.controls;
  }
  submitForm(event) {
    event.preventDefault();
    this.cateService.store(this.cateForm.value).subscribe(data => {
      if (data.id !== undefined) {
        this.router.navigate(['/admin/category']);
      }
    });
  }
}
