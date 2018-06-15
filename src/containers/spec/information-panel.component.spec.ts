import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { InformationPanelComponent } from '../information-panel/information-panel.component';
import { WaypointDirective} from '../information-panel/directives/waypoints.directive';
import { Component, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('InformationPanelComponent', () => {
  let fixture: ComponentFixture<InformationPanelTestComponent>;
  let ipTestComp: any;
  let ip: any;
  let ipComp: any;
  let ipEl: any;
  let ipHandle: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InformationPanelComponent,
        InformationPanelTestComponent,
        WaypointDirective
      ]
    }).compileComponents();
  }));

  beforeEach( () => {
    fixture = TestBed.createComponent(InformationPanelTestComponent);
    ipTestComp = fixture.debugElement.componentInstance;
    ip = fixture.debugElement.query(By.css('information-panel'));
    ipComp = ip.componentInstance;
    ipEl = ip.nativeElement;
    ipHandle = fixture.debugElement.query(By.css('.information-panel__handle'));
    fixture.detectChanges();
  });

  it('should create an information panel element', () => {
    expect(ipComp).toBeTruthy();
  });

  it('should start off closed', () => {
    expect(ipComp.active).toBe(false);
  });

  it('should open/close when toggled', () => {
    ipComp.toggle();
    expect(ipComp.active).toBeTruthy('panel should be open');
    ipComp.toggle();
    expect(ipComp.active).toBe(false, 'panel should be closed');
  });

  it('should open/close when handle clicked', () => {
    ipHandle.triggerEventHandler('click', null);
    expect(ipComp.active).toBeTruthy();
    ipHandle.triggerEventHandler('click', null);
    expect(ipComp.active).toBe(false);
  });

  it('should react to waypoint change', () => {
    let waypoint = fixture.debugElement.query(By.directive(WaypointDirective));
    waypoint.triggerEventHandler('waypointChange', 'down');
    expect(ipComp.offsetRight.split('px')[0].valueOf()).toBeGreaterThan(0);
  });

  it('should react to waypointBottom change', () => {
    let waypointBottom = fixture.debugElement.query(By.css('.information-panel-waypoint-bottom'));
    waypointBottom.triggerEventHandler('waypointChange', 'down');
    expect(ipComp.isFixedBottom).toBe(true);
  });

  it('should reposition on resize', () => {
    let waypoint = fixture.debugElement.query(By.directive(WaypointDirective));
    waypoint.triggerEventHandler('waypointChange', 'down');
    expect(ipComp.offsetRight.split('px')[0].valueOf()).toBeGreaterThan(0);
    ipComp.isFixed = false;
    ipComp.onResize();
    expect(ipComp.offsetRight).toBe('');
  });

});

@Component({
  template: `<div style="border:2px solid darkgrey;"><div style="position:relative;" margin-top>
    <div padding-horizontal>
      <h2 style="padding-left:10px;">Sample Content</h2>
      <p style="padding:0 100px 2000px 10px;">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil officiis pariatur aliquid
        enim delectus placeat, iusto, fugiat consectetur inventore. Reprehenderit velit odit error quaerat repudiandae,
        suscipit possimus sapiente repellat minima, in nesciunt eos fugiat id, explicabo distinctio omnis. Molestiae
        accusamus placeat praesentium? Optio porro dolores dolorum, nesciunt magnam, et amet.
      </p>
      <h3>{{offsetRight}}</h3>
    </div>
    <information-panel #ip title="Title" helpButtonLabel="Help">
      <ul>
        <li><a href>Link 1</a></li>
        <li><a href>Link 2</a></li>
        <li><a href>Link 3</a></li>
      </ul>
      <a href>See All Topics</a>
    </information-panel>
  </div></div>`
}) class InformationPanelTestComponent {
  offsetRight: any;
}
