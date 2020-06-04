import { Injectable } from '@angular/core';
import { IWord } from './iwords';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class WordsService {

  private wordUrl = 'assets/words.json';

  constructor (private http: HttpClient) { }
  
  getWords(): Observable<IWord[]> {
    return this.http.get<IWord[]>(this.wordUrl).pipe(
      tap(data=>console.log('All:' + JSON.stringify(data))),
      catchError(this.handleError)
    ); 
  }
  // getWord(id:number): Observable<IWord> {
  //     return this.getWords()
  //     .pipe(
  //       map((words: IWord[]) => (w => w.wordId === id))
  //     ); 
  //   }
  
    private handleError(err: HttpErrorResponse){
      let errorMessage = '';
      if(err.error instanceof ErrorEvent){
        errorMessage = `An error occured : ${err.error.message}`;
      }else{
        errorMessage = `Server returned code : ${err.status},error message is ${err.message}` ;
      }
      console.error(errorMessage);
      return throwError(errorMessage);
    } 
}

