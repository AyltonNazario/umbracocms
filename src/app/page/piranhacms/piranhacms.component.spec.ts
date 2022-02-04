import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiranhacmsComponent } from './piranhacms.component';

describe('PiranhacmsComponent', () => {
  let component: PiranhacmsComponent;
  let fixture: ComponentFixture<PiranhacmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiranhacmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiranhacmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
