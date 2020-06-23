import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css']
})
export class PlayGameComponent implements OnInit {
  
  isStartBtnShown : boolean = false;
  isModalShown  : boolean = false;
  modalTitle : string = '';
  modalBodyMsg1: string = '';
  modalBodyMsg2: string = '';
  modalBodyMsg3: string = '';
  modalBodyBtn: string = '';
  timerStatus: string = '';
  @Output() nextModal = new EventEmitter();
  @ViewChild('autoShownModal', { static: false }) autoShownModal: ModalDirective;
    count: number;
    wordCount: number;
  constructor() { }

    ngOnInit(): void {
        console.log("inside ngOnInit of PlayGameComponent");
    }
    startGame(timer:number,count:number,wordCount:number): void{
        console.log("inside startGame");
        console.log("timer : " + timer + "count : " + this.count + "total Words : " + this.wordCount );
        this.timerStatus = (timer == 60)?'start':'over';
        this.count = count;
        this.wordCount = wordCount;
        this.getModalDetails();
        this.showModal();
        this.hideModal();
    } 
    getModalDetails() : void {
        if(this.timerStatus == 'start')
        {
            this.modalTitle = 'Find the Synonym';
            this.modalBodyMsg1 = 'Identify the word similar in meaning to the given word.';
            this.modalBodyMsg2 = 'You will have 60 seconds to complete this game.';
            this.modalBodyMsg3 = 'Your scores will be counted!!';
            this.modalBodyBtn = 'Start';
        }
        else if(this.timerStatus == 'over' )
        {
            this.modalTitle = 'Game Over';
            this.modalBodyMsg1 = 'Good game!!Your total score is ' + this.count + '/' + this.wordCount;
            this.modalBodyMsg2 = 'If you want to try again, press start.';
            this.modalBodyMsg3 = 'Or press x to close the window.';
            this.modalBodyBtn = 'Start Again';
        }
    }
    showModal(): void {
        this.isModalShown = true;
    }
     
    hideModal(): void {
        this.autoShownModal.hide();
    }
    onHidden(): void {
        this.isModalShown = false;
    }
}
