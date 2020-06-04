import { Component, OnInit } from '@angular/core';

import { IWord } from './iwords';
import { WordsService } from './words.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})

export class WordsComponent implements OnInit {
  pageTitle: string = "Find the meaning of word";
  id:number;
  index: number; 
  name:string;
  options:[];
  answer:string; 
  words : IWord[] = [];
  errorMessage: string;
  chosenAnswer : string = '';
  selectedRow : number;
  answerResponse : string;

  constructor(private wordService: WordsService) { }

  ngOnInit() : void {
    this.wordService.getWords().subscribe({
      next:words=>{
        this.words = words;
        this.index = 0;
        this.getWord(this.index);
      },
      error:err=>this.errorMessage = err
    });
  } 

  getWord(i: number) : void {
      console.log(`index is ${i}`);
      this.id = this.words[i].wordId;
      this.name = this.words[i].wordName;
      this.options = this.words[i].wordOptions;
      this.answer = this.words[i].correctAns;     
      this.answerResponse = '';
      this.selectedRow = -1;
  }
  showNextWord() : void {
    switch(true)
    {
    case (this.chosenAnswer == ''):
      this.answerResponse = "No option has been chosen";
      break;
    case (this.answer === this.chosenAnswer):
      this.answerResponse = "Your answer is correct";
      if(this.id == this.words.length)
      {
        alert("End of Level 1");
      }
      else
      {
        this.getWord(this.id);
      }
      break;
    case (this.answer !== this.chosenAnswer):
      this.answerResponse = "Your answer is incorrect";
      break;
    }
  }

  setClickedRow(index:number,answer:string) : void{
    this.selectedRow = index;
    this.chosenAnswer = answer;
  }

}
