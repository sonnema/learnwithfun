import { Component, OnInit } from '@angular/core';


@Component({
  // selector: 'app-wordgames',
  templateUrl: './wordgames.component.html',
  styleUrls: ['./wordgames.component.css']
})
export class WordgamesComponent implements OnInit {
  pageTitle: string = "Word Games";
  active : string = 'top';
  constructor() { }

  ngOnInit() {
  }

}
