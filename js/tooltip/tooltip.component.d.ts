import { EventEmitter, NgZone, OnDestroy } from '@angular/core';
export declare class TooltipComponent implements OnDestroy {
    private zone;
    container: any;
    cssClass: string;
    tutorialIndex: number;
    first: boolean;
    last: boolean;
    attachment: string;
    targetAttachment: string;
    onTooltipToggle: EventEmitter<any>;
    onTooltipNavigate: EventEmitter<any>;
    tooltipState: string;
    active: boolean;
    isTutoring: boolean;
    private target;
    private tether;
    private disableTimeout;
    private enableTimeout;
    constructor(zone: NgZone);
    setupTooltip(target: HTMLElement, attachment: string, targetAttachment: string): void;
    destroyTooltip(): void;
    clearTimeouts(): void;
    toggle(): void;
    hide(): void;
    show(): void;
    initTooltip(): void;
    ngOnDestroy(): void;
}
