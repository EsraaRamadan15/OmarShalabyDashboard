import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TosterNotifierComponent } from './toster-notifier.component';

describe('TosterNotifierComponent', () => {
  let component: TosterNotifierComponent;
  let fixture: ComponentFixture<TosterNotifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TosterNotifierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TosterNotifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
