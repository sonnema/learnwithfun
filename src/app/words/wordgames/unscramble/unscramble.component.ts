import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unscramble',
  templateUrl: './unscramble.component.html',
  styleUrls: ['./unscramble.component.css']
})
export class UnscrambleComponent implements OnInit {
  showUnscrambleDiv: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
