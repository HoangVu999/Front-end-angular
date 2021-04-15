import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../../../services/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../../services/category.service';
import {AuthorService} from '../../../../services/author.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {Category} from '../../../../models/category';
import {Author} from '../../../../models/author';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  authorId: string;
  editForm: FormGroup;
  cates: Category[] = [];
  authors: Author[] = [];
  selectedFile: File = null;
  fb;
  image!: String;
  downloadURL: Observable<string>;
  constructor(private bookService: BookService,
              private router: Router,
              private route: ActivatedRoute,
              private cateService: CategoryService,
              private authorService: AuthorService,
              private storage: AngularFireStorage) {
    this.editForm = this.createForm()
  }
  async ngOnInit() {
    await this.route.params.subscribe(params => {
      this.authorId = params.id
    });
    const book = await this.bookService.findById(this.authorId).toPromise()
      console.log(book)
      this.image = book.image
      this.editForm.setValue({
        title: book.title,
        price: book.price,
        image: null,
        short_desc: book.short_desc,
        detail: book.detail,
        categoryId: book.categoryId,
        authorId: book.authorId
      })
    console.log('test')
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
      image: new FormControl(''),
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
    return this.editForm.controls;
  }
  submitForm(event) {
    event.preventDefault();
    console.log(this.editForm.value.image)
    if (this.editForm.value.image === null) {
      this.editForm.controls['image'].setValue(this.image)
      console.log(this.editForm.value)
    }
    this.bookService.update(Number(this.authorId), this.editForm.value).subscribe(data => {
      if (data.id !== undefined) {
        this.router.navigate(['/admin/book']);
      }
    });
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
                  this.editForm.controls['image'].setValue(url);
                  console.log(this.editForm.value)
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
  getCateList() {
    this.cateService.getAll().subscribe(data => {
     this.cates = data

    });
  }
  getAuthorList() {
    this.authorService.getAll().subscribe(data => {
     this.authors = data
    });
  }
}
