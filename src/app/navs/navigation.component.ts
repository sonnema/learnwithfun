import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  pageTitle:string = "Learning Words With Fun";
  navItems: string[] = ['Apple', 'Orange', 'Banana'];
  selectednavItem = this.navItems[0];
  constructor() { }

  ngOnInit() {
  }

}
