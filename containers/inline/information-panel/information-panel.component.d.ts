import { AfterViewInit, ElementRef } from '@angular/core';
export declare class InformationPanelComponent implements AfterViewInit {
    _title: String;
    _helpButtonLabel: String;
    title: String;
    helpButtonLabel: String;
    offsetRight: string;
    containerHeight: number;
    waypoint: ElementRef;
    container: ElementRef;
    active: boolean;
    isFixed: boolean;
    isFixedBottom: boolean;
    private static getOffsetRight(element);
    constructor();
    onResize(): void;
    ngAfterViewInit(): void;
    toggle(): void;
    onWaypointChange(event: string): void;
    onWaypointChangeBottom(event: string): void;
    private getHeight(element);
    private positionPanel();
}
