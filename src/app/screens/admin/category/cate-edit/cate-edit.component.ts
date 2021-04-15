import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../../services/category.service';

@Component({
  selector: 'app-cate-edit',
  templateUrl: './cate-edit.component.html',
  styleUrls: ['./cate-edit.component.css']
})
export class CateEditComponent implements OnInit {
  cateId: string;
  editForm: FormGroup;
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private cateService: CategoryService
  ) {
    this.editForm = this.createForm()
  }

  async ngOnInit() {
    await this.route.params.subscribe(params => {
      this.cateId = params.id
    });
    await this.cateService.findById(this.cateId).subscribe(cate => {
      this.editForm.setValue({
        id: cate.id,
        name: cate.name
      })
    });
  }
  createForm() {
    return new FormGroup({
      id: new FormControl(),
      name: new FormControl('',[
        Validators.required,
        Validators.minLength(4)
      ])
    })
  }

  get f() {
    return this.editForm.controls;
  }

  submitForm(event) {
    event.preventDefault();
    this.cateService.update(this.editForm.value).subscribe(data => {
      this.router.navigate(['/admin/category']);
    })
  }
}
