import { Injectable } from '@angular/core';
import { WordDef } from './word-def';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class WordsService {
  private wordUrl = "http://localhost:3000";
  dateTime = new Date();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor (private http: HttpClient, private router: Router) { }
  
  getWords (): Observable<WordDef[]> {
    return this.http.get<WordDef[]>(this.wordUrl + '/words/')
      .pipe(
        tap(words => console.log('fetched words')),
        catchError(this.handleError)
      );
  }
   
  addWord (word): Observable<WordDef> {
    word.updated = this.dateTime.toLocaleString();
    return this.http.post<WordDef>(this.wordUrl + '/words/', JSON.stringify(word),this.httpOptions)
    .pipe(
      tap(word => console.log("word")),
      catchError(this.handleError)
    );
  }
  
  getWordById(id): Observable<WordDef> {
    return this.http.get<WordDef>(this.wordUrl + '/words/' + id)
    .pipe(
      catchError(this.handleError)
    )
  }
  
  updateWord(id, word): Observable<WordDef> {
    word.updated = this.dateTime.toLocaleString();
    return this.http.put<WordDef>(this.wordUrl + '/words/' + id, JSON.stringify(word), this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  deleteWord(id){
    return this.http.delete<WordDef>(this.wordUrl + '/words/' + id, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    if(err.error instanceof ErrorEvent){
      errorMessage = `An error occured : ${err.error.message}`;
    }
    else
    {
      errorMessage = `Server returned code : ${err.status},error message is ${err.message}` ;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  } 
}

