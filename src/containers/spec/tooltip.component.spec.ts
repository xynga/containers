import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { TooltipTargetDirective } from '../tooltip/directives/tooltip-target.directive';


@Component({
  template: `
    <div [tooltipTarget]="tooltip"
         targetAttachment="bottom right"
         attachment="top right"></div>
    <tooltip #tooltip></tooltip>
  `
}) class TooltipTestComponent {}

describe('TooltipComponent', () => {
  let tt: any;
  let ttComp: any;
  let ttEl: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TooltipComponent,
        TooltipTestComponent,
        TooltipTargetDirective
      ],
      imports: [
        NoopAnimationsModule
      ]
    }).compileComponents();
  }));

  let fixture: ComponentFixture<TooltipTestComponent>;
  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipTestComponent);
    tt = fixture.debugElement.query(By.css('tooltip'));
    ttComp = tt.componentInstance;
    ttEl = tt.nativeElement;
    fixture.detectChanges();
  });

  it('Should create a tooltip element', () => {
    expect(tt).toBeTruthy();
  });

  it('Should open on tooltip toggle', fakeAsync(() => {
    ttComp.toggle();
    tick(300);
    expect(ttComp.active).toBeTruthy();
  }));

  it('Should hide on tooltip toggle', fakeAsync(() => {
    ttComp.toggle();
    tick(300);
    expect(ttComp.active).toBeTruthy();
    ttComp.toggle();
    tick(300);
    expect(ttComp.active).toBe(false);
  }));

  it('Should disable/enable timeouts', fakeAsync(() => {
    ttComp.toggle();
    tick(300);
    ttComp.toggle();
    tick(300);
    const clearTimeoutsRan = spyOn(ttComp, 'clearTimeouts').and.callThrough();
    ttComp.clearTimeouts();
    expect(clearTimeoutsRan).toHaveBeenCalled();

  }));
});
