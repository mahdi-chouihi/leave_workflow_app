import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifcardComponent } from './notifcard.component';

describe('NotifcardComponent', () => {
  let component: NotifcardComponent;
  let fixture: ComponentFixture<NotifcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotifcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
