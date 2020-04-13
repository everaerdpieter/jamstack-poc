import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseFunctionsService } from './firebase-functions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'update-github-poc';
  savedText: string;
  formGroup: FormGroup;
  errorMessage: string;

  constructor(private readonly functionsService: FirebaseFunctionsService) {
    this.savedText = 'todo: this text should come from the backend';
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      textArea: new FormControl(null, Validators.required),
    });
  }

  async submit() {
    this.errorMessage = null;
    const text = this.formGroup.get('textArea').value;
    try {
      await this.functionsService.saveUserData(text);
    } catch (error) {
      this.errorMessage = error.message;
    }
  }
}
