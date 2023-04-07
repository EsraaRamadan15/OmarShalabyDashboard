import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbedViedoComponent } from './embed-viedo.component';

describe('EmbedViedoComponent', () => {
  let component: EmbedViedoComponent;
  let fixture: ComponentFixture<EmbedViedoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbedViedoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmbedViedoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
