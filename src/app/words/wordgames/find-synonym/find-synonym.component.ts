import { Component, OnInit, ViewChild, Output, EventEmitter, TemplateRef, ElementRef } from '@angular/core';
import { WordDef } from 'src/app/shared/word-def';
import { WordsService } from 'src/app/shared/words.service';
import { Router } from '@angular/router';
import { WordDetailsComponent } from 'src/app/words/word-details/word-details.component';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-find-synonym',
  templateUrl: './find-synonym.component.html',
  styleUrls: ['./find-synonym.component.css']
})
export class FindSynonymComponent implements OnInit {
  pageTitle: string = "Find the synonym";
  id:number;
  index: number; 
  name:string;
  length: number;
  synonym1:string;
  synonym2:string;
  options: string[];
  answer:string; 
  words : WordDef[] = [];
  score: number = 0;
  totalWords: number = 0;
  timer: number = 45;
  isStartBtnShown : boolean = false;
  isModalShown  : boolean = false;
  modalTitle : string = '';
  modalBodyMsg1: string = '';
  modalBodyMsg2: string = '';
  modalBodyMsg3: string = '';
  modalBodyBtn: string = '';
  isDivEnabled : boolean = false;
  hideBtnClick : boolean = false;

  @ViewChild( WordDetailsComponent ,{static:false}) child: WordDetailsComponent ;
  @ViewChild('autoShownModal', { static: false }) autoShownModal: ModalDirective;
  
  constructor(private wordService: WordsService,
  private router: Router) { }

  ngOnInit() {
    this.modalTitle = 'Find the Synonym';
    this.modalBodyMsg1 = 'Identify the word similar in meaning to the given word.';
    this.modalBodyMsg2 = `You will have ${this.timer} seconds to complete this game.`;
    this.modalBodyMsg3 = 'Your scores will be counted!!';
    this.modalBodyBtn = 'Start';
    this.showModal();
  }
  
  showModal(): void {
    this.isModalShown = true;
    this.isDivEnabled = false;
  }
 
  hideModal(): void {
    this.isModalShown = false;
    //this.isStartBtnShown = (this.modalTitle == 'Game Over') ? true : false;
    this.isStartBtnShown = true;
    this.child.showChildDiv = false;
  }
  startGame(): void{
    this.score = 0;
    this.child.count = 0;
    this.totalWords = 0;
    this.hideModal();
    this.playGame();
  } 
  onHidden(): void {
    this.isModalShown = false;
  }
  
  playGame() : void {
    this.timer = 15;
    this.startCountdown();
    this.wordService.getWords().subscribe((data: WordDef[])=>{
      this.words = data;
      length = this.words.length;
      this.showNextWord();
    })
  }
  showNextWord() : void {
    this.index = Math.floor(Math.random() * length);
    this.totalWords = this.totalWords + 1;
    this.isDivEnabled = true;
    this.getWord(this.index);
    this.getOptionsArray();
    //this.words.splice(this.index,1);
  }

  getWord(i: number) : void {
      this.id = this.words[i].id;
      this.name = this.words[i].name;
      this.synonym1 = this.words[i].synonym1;
      this.synonym2 = this.words[i].synonym2;
  }

  getOptionsArray() : void{
    let correctOptPos = 0, optionsIndex = 0, arr = [], optArr = [];
    for (let w of this.words){
      arr.push(w.synonym1);
      arr.push(w.synonym2);
      arr.push(w.antonym1);
      arr.push(w.antonym2);
    }
    arr.splice(arr.indexOf(this.synonym1),1);
    if(this.synonym2 !== '')
    {
      arr.splice(arr.indexOf(this.synonym2),1);
    }
    for(let j=0;j<3;j++)
    {
      optionsIndex = Math.floor(Math.random() * 4);
      optArr.push(arr[optionsIndex]);
      arr.splice(optionsIndex,1);
    }
    correctOptPos = Math.floor(Math.random() * 4);
    optArr.splice(correctOptPos,0,(this.synonym1));
    this.options = optArr;
  }

  startCountdown() {
    this.isStartBtnShown = false;
    const interval = setInterval(() => {
      this.timer--;
      if (this.timer <= 0 ) {
        clearInterval(interval);  
        this.modalTitle = 'Game Over';
        this.modalBodyMsg1 = `Good game!!Your total score is ${this.child.count}/${this.totalWords}` ;
        this.modalBodyMsg2 = 'If you want to try again, press start.';
        this.modalBodyMsg3 = '';
        this.modalBodyBtn = 'Start Again';
        this.showModal();
        //this.startGame();
      }  
    },1000);
  }
  
  setClickedRow(answer:string) : void{
    this.isDivEnabled = false;
    this.child.validateAnswer(this.id,answer);
  } 

  returnFromChild() : void { 
    this.isDivEnabled = false;
    this.score = this.child.count;
    this.child.showChildDiv = !this.child.showChildDiv;
    this.showNextWord();
  }
}
