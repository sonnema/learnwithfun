import { Component, OnInit } from '@angular/core';
import { WordsService } from 'src/app/shared/words.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  //selector: 'app-add-words',
  templateUrl: './add-words.component.html',
  styleUrls: ['./add-words.component.css']
})
export class AddWordsComponent implements OnInit {
  pageTitle: string = "Add a new word";
  wordForm: FormGroup;
  submitted = false;
  constructor(private wordService:WordsService,
              private fb: FormBuilder,
              private router: Router
             ){ }

  ngOnInit() {
    this.wordForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      meaning: ['', [Validators.required, Validators.maxLength(80)]],
      synonym1: ['', [Validators.required, Validators.minLength(3)]],
      synonym2: [''],
      antonym1: ['', [Validators.required, Validators.minLength(3)]],
      antonym2: ['']
    });
  }
  addWord() {
    this.wordService.addWord(this.wordForm.value)
      .subscribe(res => {
        console.log("Word added : " + this.wordForm);
        this.router.navigate(['/words']);
        }, 
        (err) => {console.log(err);
    });
  }    
}
