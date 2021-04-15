import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API_URL = 'http://localhost:3000/categories';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.API_URL}?_embed=books`);
  }
  getAllId(id: any): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.API_URL}/${id}?_embed=books`);
  }

  findById(id: any): Observable<Category> {
    const requestUrl = `${this.API_URL}/${id}?_embed=books`;
    return this.http.get<Category>(requestUrl);
  }

  remove(id: any): Observable<any> {
    const requestUrl = `${this.API_URL}/${id}`;
    return this.http.delete<any>(requestUrl);
  }

  update(object: Category): Observable<any> {
    const requestUrl = `${this.API_URL}/${object.id}`;
    return this.http.put<any>(requestUrl, object);
  }

  store(object: Category): Observable<Category> {
    return this.http.post<Category>(this.API_URL, object);
  }
}
