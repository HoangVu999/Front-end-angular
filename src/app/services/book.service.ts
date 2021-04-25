import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {Book} from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private bookApi = 'http://localhost:3000/books';
  constructor(private http: HttpClient) { }

  getAll(filter: any): Observable<any> {
    let requestUrl = this.bookApi + '?_expand=category&_expand=author';
    if (filter.keyword.length > 0) {
      requestUrl += `&title_like=${filter.keyword}`;
    }
    return this.http.get<any>(requestUrl);
  }

  getAllBook() {
    return this.http.get<Book[]>(`${this.bookApi}?_expand=category&_expand=author`)
  }

  findById(id: string): Observable<any> {
    const requestUrl = `${this.bookApi}/${id}?_expand=category&_expand=author`;
    return this.http.get<any>(requestUrl);
  }

  removeBook(id: any): Observable<any> {
    const requestUrl = `${this.bookApi}/${id}`;
    return this.http.delete<any>(requestUrl);
  }

  store(object: Book): Observable<Book> {
    return this.http.post<Book>(this.bookApi, object);
  }

  update(id: Number, object: Book): Observable<any> {
    const requestUrl = `${this.bookApi}/${id}`;
    return this.http.put<any>(requestUrl, object);
  }

  removeMultiple(idList: any[]): Observable<any> {
    const requestUrls = idList.map(
        id => this.http.delete<any>(`${this.bookApi}/${id}`)
    );
    return forkJoin(requestUrls);
  }

}
