import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CollapseComponent } from '../collapse/collapse.component';
import { By } from '@angular/platform-browser';

describe('CollapseComponent', () => {
  let fixture: ComponentFixture<CollapseComponent>;
  let collapseComp: any;
  let collapseElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CollapseComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapseComponent);
    collapseComp = fixture.debugElement.componentInstance;
    collapseElement = fixture.debugElement.query(By.css('.collapse')).nativeElement;
  });

  it('should create a collapsible box element', () => {
    expect(collapseComp).toBeTruthy();
  });

  it('should have _isActive initialized to false', () => {
    expect(collapseComp._isActive).toBe(false);
  });

  it('should set _isActive when isActive input is changed', () => {
    collapseComp.isActive = true;
    fixture.detectChanges();
    expect(collapseComp._isActive).toBe(true);
  });

  it('should open when isActive is set to true', () => {
    collapseComp.isActive = true;
    fixture.detectChanges();
    const contentElement = fixture.debugElement.query(By.css('.collapse__content div')).nativeElement;
    contentElement.innerHTML = '<div style="padding:0 10px;border:2px dashed;"><h1>Collapse Title</h1><p>Message body...</p></div>';
    collapseComp.runCollapseOpen();
    expect(collapseComp.collapseHeight.split('px')[0].valueOf()).toBeGreaterThan(0);
  });

  it('should close when isActive is set to false', () => {
    collapseComp.isActive = true;
    fixture.detectChanges();
    const contentElement = fixture.debugElement.query(By.css('.collapse__content div')).nativeElement;
    contentElement.innerHTML = '<div style="padding:0 10px;border:2px dashed;"><h1>Collapse Title</h1><p>Message body...</p></div>';
    collapseComp.runCollapseOpen();
    collapseComp.isActive = false;
    fixture.detectChanges();
    collapseComp.runCollapseClose();
    fixture.detectChanges();
    expect(collapseComp.collapseHeight).toBe(0);
  });
});
