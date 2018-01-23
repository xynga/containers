import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';
import {
  BodyDirective, CardComponent, CollapseComponent, DragAndDropComponent,
  InformationPanelComponent, ModalPanelComponent,
  TooltipComponent, TooltipTargetDirective, WaypointDirective
} from 'xynga-containers';
import { IconComponent } from 'xynga-general';
import { FileDropDirective } from 'ng2-file-upload';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule, By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    const bodyDirectiveStub = {
      modalOpen: false
    };

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CardComponent,
        CollapseComponent,
        DragAndDropComponent,
        IconComponent,
        InformationPanelComponent,
        ModalPanelComponent,
        TooltipComponent,
        BodyDirective,
        FileDropDirective,
        TooltipTargetDirective,
        WaypointDirective
      ],
      imports: [
        BrowserModule,
        NoopAnimationsModule,
        AppRoutingModule
      ],
      providers: [
        {provide: BodyDirective, useValue: bodyDirectiveStub},
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Testing'`, async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Testing');
  }));

  it('should contain a CardComponent', async(() => {
    const debugElement = fixture.debugElement;
    const cardBody = debugElement.query(By.css('card.header.footer card[body] div')).nativeElement;
    expect(cardBody.textContent).toContain('BODY BODY');
  }));

  it('should utilize BodyDirective for ModalComponent', async(() => {
    let bodyDirective = fixture.debugElement.injector.get(BodyDirective);
    expect(bodyDirective.modalOpen).toBe(false);
  }));

  it('should have button text', () => {
    fixture.detectChanges();
    const collapseButtonElement = fixture.debugElement.query(By.css('#collapse button')).nativeElement;
    expect(collapseButtonElement.textContent).toContain('Open Text');
  });
});
