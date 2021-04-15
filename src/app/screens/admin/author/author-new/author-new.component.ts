import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthorService} from '../../../../services/author.service';

@Component({
  selector: 'app-author-new',
  templateUrl: './author-new.component.html',
  styleUrls: ['./author-new.component.css']
})
export class AuthorNewComponent implements OnInit {
  authorForm: FormGroup;
  constructor(private authorService: AuthorService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.authorForm = this.createForm();
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
    return this.authorForm.controls;
  }
  submitForm(event) {
    event.preventDefault();
    this.authorService.store(this.authorForm.value).subscribe(data => {
      if (data.id !== undefined) {
        this.router.navigate(['/admin/author']);
      }
    });
  }
}
