import {Directive, ElementRef, Input, Output, EventEmitter, AfterViewInit, OnDestroy} from '@angular/core';

import 'waypoints/lib/noframework.waypoints.js';

declare let Waypoint: any;

const SELECTOR: string = '[waypoint]';

@Directive({
  selector: SELECTOR
})
export class WaypointDirective implements AfterViewInit, OnDestroy {
  @Input() context: Element;
  @Input() offset: number | string;
  @Input() horizontal: boolean = false;
  @Output() waypointChange = new EventEmitter();

  public waypoint: any;

  public constructor(public element: ElementRef) {}

  public ngAfterViewInit(): void {
    setTimeout(() => this.setWaypoint(), 250);
  }

  public setWaypoint(): void {
    let config: any = {
      element: this.element.nativeElement,
      handler: (direction: string) => this.waypointChange.emit(direction)
    };

    if (this.offset) {
      config.offset = this.offset;
    }

    if (this.context) {
      config.context = this.context;
    }

    if (this.horizontal) {
      config.horizontal = this.horizontal;
    }

    this.waypoint = new Waypoint(config);
  }

  public ngOnDestroy(): void {
    if (this.waypoint) {
      this.waypoint.destroy();
    }
  }
}
