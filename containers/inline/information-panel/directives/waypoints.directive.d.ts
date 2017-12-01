import { ElementRef, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import 'waypoints/lib/noframework.waypoints.js';
export declare class WaypointDirective implements AfterViewInit, OnDestroy {
    element: ElementRef;
    context: Element;
    offset: number | string;
    horizontal: boolean;
    waypointChange: EventEmitter<{}>;
    waypoint: any;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    setWaypoint(): void;
    ngOnDestroy(): void;
}
