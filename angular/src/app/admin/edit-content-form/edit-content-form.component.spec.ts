import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContentFormComponent } from './edit-content-form.component';

describe('EditContentFormComponent', () => {
  let component: EditContentFormComponent;
  let fixture: ComponentFixture<EditContentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditContentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
