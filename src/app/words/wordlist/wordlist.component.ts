import { Component, OnInit } from '@angular/core';
//import { Word } from 'src/app/shared/words';
import { WordDef } from 'src/app/shared/word-def';
import { WordsService } from 'src/app/shared/words.service';

@Component({
  // selector: 'app-wordlist',
  templateUrl: './wordlist.component.html',
  styleUrls: ['./wordlist.component.css']
})
export class WordlistComponent implements OnInit {
  pageTitle: string = "Word List";
  words : WordDef[] = [];
  private _listFilter: string;
  filteredWords : WordDef[] = [];
  
  get listFilter(): string {
    return this._listFilter;
  }                
  
  set listFilter( value: string){
    this._listFilter = value;
    this.filteredWords = this.listFilter ? this.performFilter(this.listFilter) : this.words;
  } 
  
  constructor(private wordService: WordsService) { }
  
  performFilter(filterBy: string) : WordDef[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.words.filter((word: WordDef) =>
    word.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  
  ngOnInit() {
    this.wordService.getWords().subscribe((data: WordDef[])=>{
      console.log(data);
      this.words = data;
      this.filteredWords = this.words;
    }) 
  }
  
  deleteWord(id, index) {
    this.wordService.deleteWord(id)
      .subscribe(res => {    
          this.words.splice(index,1);
        }, (err) => {
          console.log(err);
        }
      );
  }
}
