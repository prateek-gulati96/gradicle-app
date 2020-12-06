import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogcenterComponent } from './blogcenter.component';

describe('BlogcenterComponent', () => {
  let component: BlogcenterComponent;
  let fixture: ComponentFixture<BlogcenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogcenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
