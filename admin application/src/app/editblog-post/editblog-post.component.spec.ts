import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditblogPostComponent } from './editblog-post.component';

describe('EditblogPostComponent', () => {
  let component: EditblogPostComponent;
  let fixture: ComponentFixture<EditblogPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditblogPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditblogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
