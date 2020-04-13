import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'update-github-poc';
  savedText: string;
  formGroup: FormGroup;

  constructor() {
    this.savedText = 'todo: this text should come from the backend';
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      textArea: new FormControl(null, Validators.required),
    });
  }

  submit() {
    alert(this.formGroup.get('textArea').value);
  }
}
