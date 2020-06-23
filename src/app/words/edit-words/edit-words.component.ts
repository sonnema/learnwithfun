import { Component, OnInit } from '@angular/core';
import { WordsService } from 'src/app/shared/words.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//import { WordDef } from 'src/app/shared/word-def';

@Component({
  //selector: 'app-edit-words',
  templateUrl: './edit-words.component.html',
  styleUrls: ['./edit-words.component.css']
})
export class EditWordsComponent implements OnInit {
  pageTitle :string = "Update ";
  wordForm: FormGroup;
  id:number= null;
  dateTime = new Date();
  constructor(private wordService:WordsService,
    private fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.getDetail(this.activateRoute.snapshot.params['id']);
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
        this.id = data.id;
        this.wordForm.setValue({
          name: data.name,
          meaning: data.meaning,
          synonym1: data.synonym1,
          synonym2: data.synonym2,
          antonym1: data.antonym1,
          antonym2: data.antonym2
        });
        console.log(data);
      });
  }
  updateWord(form:NgForm) {
    this.wordService.updateWord(this.id,form)
      .subscribe(res => {
          this.router.navigate(['/words']);
        }, (err) => {
          console.log(err);
        }
      ); 
  }
}
