import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentstackComponent } from './contentstack.component';

describe('ContentstackComponent', () => {
  let component: ContentstackComponent;
  let fixture: ComponentFixture<ContentstackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentstackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentstackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
