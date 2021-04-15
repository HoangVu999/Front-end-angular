import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../../../services/book.service';
import {Router} from '@angular/router';
import {Category} from '../../../../models/category';
import {CategoryService} from '../../../../services/category.service';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {AuthorService} from '../../../../services/author.service';
import {Author} from '../../../../models/author';

@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.css']
})
export class BookNewComponent implements OnInit {
  bookForm: FormGroup;
  cates: Category[] = [];
  authors: Author[] = [];
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  constructor(private bookService: BookService,
              private router: Router,
              private cateService: CategoryService,
              private authorService: AuthorService,
              private storage: AngularFireStorage) {
    this.bookForm = this.createForm();
  }

  ngOnInit(): void {
    this.getCateList();
    this.getAuthorList();
  }
  createForm() {
    return new FormGroup({
      title: new FormControl('', [
          Validators.required
      ]),
      price: new FormControl('', [
          Validators.required
      ]),
      image: new FormControl('', [
          Validators.required
      ]),
      short_desc: new FormControl('', [
          Validators.required
      ]),
      detail: new FormControl('', [
          Validators.required
      ]),
      categoryId: new FormControl('', [
          Validators.required
      ]),
      authorId: new FormControl('', [
        Validators.required
      ])
    })
  }
  get f() {
    return this.bookForm.controls;
  }
  getCateList() {
    this.cateService.getAll().subscribe(data => {
      this.cates = data;
    });
  }
  getAuthorList() {
    this.authorService.getAll().subscribe(data => {
      this.authors = data;
    });
  }
  submitForm(event) {
    event.preventDefault();
    setTimeout(() => {
      this.bookService.store(this.bookForm.value).subscribe(data => {
        if (data.id !== undefined) {
          this.router.navigate(['/admin/book']);
        }
      });
    }, 1500)
  }
  onFileSelected(event) {
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `UpLoadImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`UpLoadImages/${n}`, file);
    task
        .snapshotChanges()
        .pipe(
            finalize(() => {
              this.downloadURL = fileRef.getDownloadURL();
              this.downloadURL.subscribe(url => {
                if (url) {
                  // @ts-ignore
                  this.bookForm.controls['image'].value = url;
                }
              });
            })
        )
        .subscribe(url => {
          if (url) {
            console.log(url);
          }
        });
  }
}
