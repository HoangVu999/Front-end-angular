import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthorService} from '../../../../services/author.service';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {
  authorId: string;
  editForm: FormGroup;
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authorService: AuthorService
  ) {
    this.editForm = this.createForm();
  }

  async ngOnInit() {
    await this.route.params.subscribe(params => {
      this.authorId = params.id;
    });
    await this.authorService.findById(this.authorId).subscribe(author => {
      this.editForm.setValue({
        id: author.id,
        name: author.name
      })
    })
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
    this.authorService.update(this.editForm.value).subscribe(data => {
      this.router.navigate(['/admin/author']);
    })
  }
}
