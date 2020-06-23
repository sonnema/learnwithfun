import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WordsService } from 'src/app/shared/words.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-word-details',
  templateUrl: './word-details.component.html',
  styleUrls: ['./word-details.component.css', '../wordgames/wordgames.component.css']
})
export class WordDetailsComponent implements OnInit {
  pageTitle :string = '';
  wordForm: FormGroup;
  count: number = 0;
  correctAnswer: string;
  userInput: string;
  response: string;
  showChildDiv: boolean = false;
  @Output() nextWord = new EventEmitter();
  constructor(private wordService:WordsService,
    private fb: FormBuilder ) { }

  ngOnInit(){
    this.wordForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      meaning: ['', [Validators.required, Validators.maxLength(80)]],
      synonym1: ['', [Validators.required, Validators.minLength(3)]],
      synonym2: [''],
      antonym1: ['', [Validators.required, Validators.minLength(3)]],
      antonym2: ['']
    });
  } 

  getDetail(id) {
    this.wordService.getWordById(id)
      .subscribe(data => { 
        this.wordForm.setValue({
          name: data.name,
          meaning: data.meaning,
          synonym1: data.synonym1,
          synonym2: data.synonym2,
          antonym1: data.antonym1,
          antonym2: data.antonym2
        });
        this.pageTitle = data.name;
        this.response = this.checkAnswer(data.synonym1); 
      });
  }
  checkAnswer(correctAnswer : string) : string{
    switch(true)
        {
          case (this.userInput == ''):
          return "No option has been chosen";
          case (correctAnswer === this.userInput):
          this.count = this.count + 1;
          return "Your answer is correct";
          case (correctAnswer !== this.userInput):
          return("Your answer is incorrect, the correct answer is " + correctAnswer);
        }
  }
  validateAnswer(id:number,answer:string) : void{
    this.userInput = answer;
    this.showChildDiv = !this.showChildDiv;
    this.getDetail(id);
  }
}
