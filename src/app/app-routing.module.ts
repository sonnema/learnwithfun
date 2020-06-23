import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordDetailsComponent } from './words/word-details/word-details.component';
import { WordlistComponent } from './words/wordlist/wordlist.component';
//import { WordgamesComponent } from './words/wordgames/wordgames.component';
import { AddWordsComponent } from './words/add-words/add-words.component';
import { WelcomeComponent } from './home/welcome.component';
import { EditWordsComponent } from './words/edit-words/edit-words.component';
import { FindSynonymComponent } from './words/wordgames/find-synonym/find-synonym.component';
import { UnscrambleComponent } from './words/wordgames/unscramble/unscramble.component';

const routes: Routes = [
  { path: 'words', component: WordlistComponent },
  { path: 'findSynonym', component: FindSynonymComponent },
  { path: 'unscramble', component: UnscrambleComponent },
  //{ path: 'wordgames', component: WordgamesComponent },
  { path: 'words/:id', component: WordDetailsComponent },
  { path: 'updateWord/:id', component: EditWordsComponent },
  { path: 'addwords', component: AddWordsComponent },
  { path: 'home', component: WelcomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
