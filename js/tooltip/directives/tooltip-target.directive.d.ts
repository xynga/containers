import { OnInit, OnDestroy, EventEmitter, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TooltipComponent } from "../tooltip.component";
export declare class TooltipTargetDirective implements OnInit, OnDestroy {
    private element;
    tooltipTarget: TooltipComponent;
    targetAttachment: string;
    attachment: string;
    onTooltipToggle: EventEmitter<any>;
    toggleSubscription: Subscription;
    constructor(element: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
