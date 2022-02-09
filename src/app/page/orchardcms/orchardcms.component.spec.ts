import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrchardcmsComponent } from './orchardcms.component';

describe('OrchardcmsComponent', () => {
  let component: OrchardcmsComponent;
  let fixture: ComponentFixture<OrchardcmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrchardcmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrchardcmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
