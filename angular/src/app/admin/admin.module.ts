import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditContentFormComponent } from './edit-content-form/edit-content-form.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    AdminPageComponent,
    LoginFormComponent,
    EditContentFormComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, AdminRoutingModule],
})
export class AdminModule {}
