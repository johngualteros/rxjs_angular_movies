import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/apiResponse';
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl: string = "http://www.omdbapi.com/?apikey=[api_key]&s=";

  constructor(private http: HttpClient) { }

  getMovies(title: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + title);
  }
}
