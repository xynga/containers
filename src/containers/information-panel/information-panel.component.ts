import {Component, ViewChild, HostListener, AfterViewInit, ElementRef, Input} from '@angular/core';

// Externalized (polyglot) text values for field labels, input placeholders, button text
// screen reader text, page headings, user instructions, help messages, menu uploads, etc

const SELECTOR = 'information-panel';

@Component({
  selector: SELECTOR,
  templateUrl: './information-panel.html',
  styleUrls: ['./information-panel.scss']
})

export class InformationPanelComponent implements AfterViewInit {

  _title: String;
  _helpButtonLabel: String;

  @Input() set title(title: String) {
    this._title = title;
  }
  @Input() set helpButtonLabel(helpButtonLabel: String) {
    this._helpButtonLabel = helpButtonLabel;
  }

  public offsetRight = '';
  public containerHeight = 0;

  @ViewChild('waypoint') waypoint: ElementRef;
  @ViewChild('container') container: ElementRef;

  public active = false;
  public isFixed = false;
  public isFixedBottom = false;

  private static getOffsetRight(element: any): number {
    const box = element.getBoundingClientRect();
    return document.documentElement.clientWidth - (box.left + window.pageXOffset - document.documentElement.clientLeft);
  }

  public constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.positionPanel();
  }

  public ngAfterViewInit(): void {
    this.positionPanel();

    // wait a tick to avoid one-time devMode unidirectional-data-flow-violation error
    // https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#parent-to-view-child

    setTimeout((_: any) => this.containerHeight = this.getHeight(this.container.nativeElement));
  }

  public toggle() {
    this.active = !this.active;

    // if (this.active) {
      // this.intercom.trackEvent('openHelpPanel');
    // }
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
    } else {
      this.offsetRight = '';
    }
  }
}
