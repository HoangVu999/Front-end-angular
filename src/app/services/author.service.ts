import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Author} from '../models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private authorApi = 'http://localhost:3000/authors';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.authorApi}?_embed=books`);
  }

  findById(id: any): Observable<Author> {
    const requestUrl = `${this.authorApi}/${id}?_embed=books`;
    return this.http.get<Author>(requestUrl);
  }

  remove(id: any): Observable<any> {
    const requestUrl = `${this.authorApi}/${id}`;
    return this.http.delete<any>(requestUrl);
  }

  update(object: Author): Observable<any> {
    const requestUrl = `${this.authorApi}/${object.id}`;
    return this.http.put<any>(requestUrl, object);
  }

  store(object: Author): Observable<Author> {
    return this.http.post<Author>(this.authorApi, object);
  }
}
