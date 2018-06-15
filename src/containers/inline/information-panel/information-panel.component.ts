import {Component, ViewChild, HostListener, AfterViewInit, ElementRef, Input} from '@angular/core';

// Externalized (polyglot) text values for field labels, input placeholders, button text
// screen reader text, page headings, user instructions, help messages, menu uploads, etc

const SELECTOR: string = 'information-panel';

@Component({
  selector: SELECTOR,
  template: `
    <span #waypoint class="information-panel-waypoint-top" waypoint [offset]="10" (waypointChange)="onWaypointChange($event)"></span>
    <span class="information-panel-waypoint-bottom" waypoint [offset]="containerHeight" (waypointChange)="onWaypointChangeBottom($event)"></span>
    <div class="information-panel" #container [class.active]="active" [class.fixed]="isFixed" [class.fixed-bottom]="isFixedBottom" [ngStyle]="{right: offsetRight}">
      <div class="information-panel__viewport">
        <button class="link-btn information-panel__handle" (click)="toggle()">
          <div class="information-panel__label">
            <ng-content select="[help-icon]"></ng-content>
            <span>
              {{_helpButtonLabel}}
            </span>
          </div>
          <div class="information-panel__arrow">
            <ng-content select="[open-icon]"></ng-content>
          </div>
        </button>
        <div class="information-panel__content">
          <h2>
            {{_title}}
          </h2>
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .panel{border:1px solid #d5d5d5}.panel--light{background-color:#d5d5d5}.panel--neutral{background-color:#d5d5d5}.information-panel-container{position:relative}.main .information-panel-container,.features .information-panel-container{margin-right:-32px}.information-panel-content{margin-right:90px}.information-panel{background:#f0efef;position:absolute;width:60px;top:0;right:0;z-index:inherit;transition:width 0.6s cubic-bezier(0.23, 1, 0.32, 1),box-shadow 0.4s;will-change:width;overflow:hidden}.information-panel__viewport{border:1px solid #d5d5d5;display:flex;align-items:stretch;transform:0.6s cubic-bezier(0.23, 1, 0.32, 1);width:350px}.information-panel.active,.information-panel:hover,.information-panel:active,.information-panel:focus{box-shadow:2px 2px 10px 0 rgba(0,0,0,0.3)}.information-panel.active{width:350px}.information-panel.active .information-panel__arrow{transform:rotate(180deg)}.information-panel.fixed{position:fixed;top:10px}.information-panel.fixed-bottom{position:absolute;bottom:10px;top:auto;right:0 !important}.information-panel__handle{padding:12px 18px;display:flex;flex-direction:column;justify-content:space-between;align-items:center;width:60px;border-right:1px solid #d5d5d5;border-top:none;border-bottom:none;border-left:none;cursor:pointer}.information-panel__handle:active,.information-panel__handle:focus{outline:none}.information-panel__label span{font-size:12px;margin-top:3px;display:block}.information-panel__arrow{transition:transform 0.4s}.information-panel__content{padding:32px}.information-panel__content h2{margin-top:-8px;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-weight:normal;transform:translateZ(0)}.information-panel__content ul{padding:0;margin-bottom:25px}.information-panel__content li{list-style-type:none;margin-bottom:15px;font-weight:bold}.information-panel-waypoint-top{position:absolute;top:0;right:0}.information-panel-waypoint-bottom{position:absolute;bottom:0;right:0}.link-btn,.link-btn:hover,.link-btn:focus,.link-btn:disabled{color:#266eb3;background:transparent;box-shadow:none;font-weight:bold}.link-btn:hover{text-decoration:underline}.link-btn:disabled{color:#d5d5d5}
  `]
})

export class InformationPanelComponent implements AfterViewInit {

  _title: String;
  _helpButtonLabel: String;

  @Input() set title(title : String) {
    this._title = title;
  }
  @Input() set helpButtonLabel(helpButtonLabel : String) {
    this._helpButtonLabel = helpButtonLabel;
  }

  public offsetRight: string = '';
  public containerHeight: number = 0;

  @ViewChild('waypoint') waypoint: ElementRef;
  @ViewChild('container') container: ElementRef;

  public active: boolean = false;
  public isFixed: boolean = false;
  public isFixedBottom: boolean = false;

  private static getOffsetRight(element: any): number {
    const box = element.getBoundingClientRect();
    return document.documentElement.clientWidth - (box.left + window.pageXOffset - document.documentElement.clientLeft);
  }

  public constructor(){};

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.positionPanel();
  }

  public ngAfterViewInit(): void {
    this.positionPanel();

    // wait a tick to avoid one-time devMode unidirectional-data-flow-violation error
    // https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#parent-to-view-child

    setTimeout((_:any) => this.containerHeight = this.getHeight(this.container.nativeElement));
  }

  public toggle() {
    this.active = !this.active;

    //if (this.active) {
      //this.intercom.trackEvent('openHelpPanel');
    //}
  }

  public onWaypointChange(event: string): void {
    this.isFixed = event === 'down';
    this.positionPanel();
  }

  public onWaypointChangeBottom(event: string): void {
    this.isFixedBottom = event === 'down';
  }

  private getHeight(element: any): number {
    return Math.round(this.container.nativeElement.getBoundingClientRect().height) + 20;
  }

  private positionPanel(): void {
    if (this.waypoint && this.isFixed) {
      this.offsetRight = InformationPanelComponent.getOffsetRight(this.waypoint.nativeElement) + 'px';
    }
    else {
      this.offsetRight = '';
    }
  }
}
