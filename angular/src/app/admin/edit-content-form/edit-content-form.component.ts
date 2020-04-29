import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GitHubService } from '../services/git-hub-service';
import { AuthService } from '../services/auth-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const homePageContentPath = 'home-page.md';

@Component({
  selector: 'app-edit-content-form',
  templateUrl: './edit-content-form.component.html',
  styleUrls: ['./edit-content-form.component.scss'],
})
export class EditContentFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  formGroup: FormGroup;

  successMessage: string;
  errorMessage: string;
  saving: boolean;

  constructor(
    private readonly authService: AuthService,
    private readonly gitHubService: GitHubService
  ) {
    this.formGroup = new FormGroup({
      textArea: new FormControl(null, Validators.required),
    });
  }

  async ngOnInit() {
    // set text area content to GitHub content when user is logged in:
    this.authService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (user) => {
        if (user) {
          try {
            this.errorMessage = null;
            this.successMessage = null;
            const content = await this.gitHubService.getContent(
              homePageContentPath
            );
            this.formGroup.get('textArea').setValue(content);
          } catch (error) {
            this.errorMessage =
              'Error when getting GitHub content: ' + error.message;
          }
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async submit() {
    this.saving = true;
    this.errorMessage = null;
    this.successMessage = null;
    const text = this.formGroup.get('textArea').value;
    try {
      await this.gitHubService.saveContent(homePageContentPath, text);
      this.successMessage = 'Content saved in GitHub. CI/CD pipeline started.';
    } catch (error) {
      this.errorMessage = 'Error when saving: ' + error.message;
    }
    this.saving = false;
  }
}
