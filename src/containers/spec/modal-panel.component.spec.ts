import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { Subscriber } from 'rxjs/Subscriber';
import { BodyDirective } from '../modal-panel/directives/body.directive';
import { ModalPanelComponent } from '../modal-panel/modal-panel.component';

describe( 'ModalPanelComponent', () => {
  let fixture: ComponentFixture<ModalPanelComponent>;
  let mp: any;
  let mpComp: any;
  let mpEl: any;

  const RouterStub = {
    events: new Observable()
  };

  beforeEach(async( () => {
    TestBed.configureTestingModule({
      declarations: [
        ModalPanelComponent,
        BodyDirective
      ],
      imports: [
        BrowserAnimationsModule
      ],
      providers: [
        BodyDirective,
        { provide: Router, useValue: RouterStub }
      ]
    }).compileComponents();
  }));

  beforeEach( () => {
    fixture = TestBed.createComponent(ModalPanelComponent);
    mp = fixture.debugElement;
    mpComp = mp.componentInstance;
    mpEl = mp.nativeElement;
  });

  it('should create a modal panel element', () => {
    mpComp.open = false;
    mpComp.detailOpen = false;
    expect(mpComp).toBeTruthy();
  });

  it('should start off closed', () => {
    expect(mpComp.panelOpen).toBe(false);
  });

  it('should open/close when open input is changed', fakeAsync(() => {
    mpComp.open = true;
    expect(mpComp.panelOpen).toBeTruthy('panel should be open');
    const deactivateSpy = spyOn(mpComp, 'deactivate').and.callThrough();
    mpComp.open = false;
    fixture.detectChanges();
    expect(deactivateSpy).toHaveBeenCalled();
    tick(600);
  }));

  it('should open/close detail when detailOpen input is changed', fakeAsync(() => {
    mpComp.open = true;
    expect(mpComp.panelOpen).toBeTruthy('panel should open');
    mpComp.detailOpen = true;
    expect(mpComp.isExpanded).toBeTruthy('panel should be expanded');
    mpComp.detailOpen = false;
    expect(mpComp.isExpanded).toBe(false, 'panel should be un-expanded');
    mpComp.open = false;
    tick(600);
    fixture.detectChanges();
  }));

  it('should close on backdrop click', fakeAsync(() => {
    mpComp.open = true;
    fixture.detectChanges();
    expect(mpComp.panelOpen).toBeTruthy('panel should open');
    const mpBackdropEl = mp.query(By.css('.modal-backdrop'));
    const onBackdropClickedSpy = spyOn(mpComp, 'onBackdropClicked').and.callThrough();
    mpBackdropEl.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(onBackdropClickedSpy).toHaveBeenCalled();
    tick(600);
  }));

  it('should close detail on detail-overlay click', fakeAsync(() => {
    mpComp.open = true;
    expect(mpComp.panelOpen).toBeTruthy('panel should open');
    mpComp.detailOpen = true;
    expect(mpComp.isExpanded).toBeTruthy('panel should be expanded');
    fixture.detectChanges();
    const detailOverlay = mp.query(By.css('.modal-detail-overlay'));
    const onCloseDetailClickedSpy = spyOn(mpComp, 'onCloseDetailClicked').and.callThrough();
    detailOverlay.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(onCloseDetailClickedSpy).toHaveBeenCalled();
    mpComp.open = false;
    tick(600);
    fixture.detectChanges();
  }));

  it('should close on close "click"', fakeAsync(() => {
    mpComp.open = true;
    expect(mpComp.panelOpen).toBeTruthy('panel should open');
    const deactivateSpy = spyOn(mpComp, 'deactivate').and.callThrough();
    mpComp.onCloseClicked();
    expect(deactivateSpy).toHaveBeenCalled();
    tick(600);
  }));
});
