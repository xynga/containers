import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {Component, ComponentRef} from '@angular/core';
import { CardComponent } from '../card/card.component';

describe('CardComponent', () => {
  class CardTestComponent {}

  let cardComp: any;
  let cardEl: any;
  let fixture: ComponentFixture<CardTestComponent>;

  beforeEach(async(() => {
    const bodyDirectiveStub = {
      modalOpen: false
    };

    TestBed.configureTestingModule({
      declarations: [
        CardComponent,
        CardTestComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTestComponent);
    cardComp = fixture.componentInstance;
    cardEl = fixture.debugElement.query(By.css('card'));
  });

  it('should create a card element', async(() => {
    expect(cardComp).toBeTruthy();
  }));

  it('should contain some stuff', async(() => {
    const cardBody = fixture.debugElement.query(By.css('card[body] div[body]')).nativeElement;
    expect(cardBody.textContent).toContain('BODY BODY');
  }));

});

@Component({
  template: `
    <div style="max-width:500px;padding:10px;">
      <card class='header footer'>
        <card body>
          <div body>BODY BODY</div>
        </card>
        <card footer nested class='footer'>
          <div body>FOOTER BODY</div>
          <div footer>FOOTER FOOTER</div>
        </card>
        <card header overlaid class='header'>
          <div header>HEADER HEADER</div>
          <div body>HEADER BODY</div>
        </card>
      </card>
    </div>
  `,
  selector: 'app-card-test'
})
