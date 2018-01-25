import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BodyDirective, ModalPanelComponent } from 'xynga-containers';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

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
    expect(mpComp).toBeTruthy();
  });

  it('should start of closed', () => {

  });
});
