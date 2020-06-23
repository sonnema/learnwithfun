import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AddWordsComponent } from './words/add-words/add-words.component';
import { WordDetailsComponent } from './words/word-details/word-details.component';
import { WordlistComponent } from './words/wordlist/wordlist.component';
import { WelcomeComponent } from './home/welcome.component';
import { EditWordsComponent } from './words/edit-words/edit-words.component';
import { FindSynonymComponent } from './words/wordgames/find-synonym/find-synonym.component';
import { UnscrambleComponent } from './words/wordgames/unscramble/unscramble.component';
//import { WordgamesComponent } from './words/wordgames/wordgames.component';
//import { PlayGameComponent } from './shared/play-game/play-game.component';
//import { PlayGameService } from './shared/play-game/play-game.service';


@NgModule({
  declarations: [
    AppComponent,
    AddWordsComponent,
    WordDetailsComponent,
    WordlistComponent,
  //  WordgamesComponent,
    WelcomeComponent,
    EditWordsComponent,
    FindSynonymComponent,
    UnscrambleComponent 
    //PlayGameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    ModalModule.forRoot(),
    CommonModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  //exports: [PlayGameComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
