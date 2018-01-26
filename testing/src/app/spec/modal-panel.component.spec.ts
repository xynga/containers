import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BodyDirective, ModalPanelComponent } from 'xynga-containers';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe( 'ModalPanelComponent',() => {
  let fixture: ComponentFixture<ModalPanelComponent>;
  let mp, mpComp, mpEl;

  const BodyDirectiveStub = {
    modalOpen: false
  };

  const RouterStub = {
    events: new Observable()
  };

  beforeEach(async( () => {
    TestBed.configureTestingModule({
      declarations: [
        ModalPanelComponent
      ],
      imports: [
        BrowserAnimationsModule
      ],
      providers: [
        { provide: BodyDirective, useValue: BodyDirectiveStub },
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
    mpComp.open = true;
    mpComp.detailOpen = false;
    fixture.detectChanges();
    expect(mpComp).toBeTruthy();
  });

  it('should start off closed', () => {
    expect(mpComp.panelOpen).toBe(false);
  });

  it('should open/close when open input is changed', () => {
    mpComp.open = true;
    expect(mpComp.panelOpen).toBeTruthy('panel should be open');
    let deactivateRun = spyOn(mpComp, 'deactivate');
    mpComp.open = false;
    expect(deactivateRun).toHaveBeenCalled();
  });

  it('should open/close detail when detailOpen input is changed', () => {
    mpComp.open = true;
    expect(mpComp.panelOpen).toBeTruthy('panel should open');
    mpComp.detailOpen = true;
    expect(mpComp.isExpanded).toBeTruthy('panel should be expanded');
    mpComp.detailOpen = false;
    expect(mpComp.isExpanded).toBe(false,'panel should be un-expanded');
  });

  it('should close on backdrop click', () => {
    mpComp.open = true;
    fixture.detectChanges();
    expect(mpComp.panelOpen).toBeTruthy('panel should open');
    let mpBackdropEl = mp.query(By.css('.modal-backdrop'));
    let onBackdropClickedSpy = spyOn(mpComp, 'onBackdropClicked');
    mpBackdropEl.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(onBackdropClickedSpy).toHaveBeenCalled();
  });
});
