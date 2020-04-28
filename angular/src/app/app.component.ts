import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GitHubService } from './services/git-hub-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'jamstack-poc';
  formGroup: FormGroup;
  errorMessage: string;

  constructor(private readonly gitHubService: GitHubService) {
    this.formGroup = new FormGroup({
      textArea: new FormControl(null, Validators.required),
    });
  }

  async ngOnInit() {
    const readMeContent = await this.gitHubService.getReadMe();
    this.formGroup.get('textArea').setValue(readMeContent);
  }

  async submit() {
    this.errorMessage = null;
    const text = this.formGroup.get('textArea').value;
    try {
      await this.gitHubService.saveReadMe(text);
    } catch (error) {
      this.errorMessage = error.message;
    }
  }
}
