import {Directive, Input, OnInit, OnDestroy, Output, EventEmitter, ElementRef} from '@angular/core';

import {Subscription} from 'rxjs/Subscription';
import {TooltipComponent} from '../tooltip.component';

const SELECTOR = '[tooltipTarget]';

@Directive({
  selector: SELECTOR
})
export class TooltipTargetDirective implements OnInit, OnDestroy {
  @Input() tooltipTarget: TooltipComponent;
  @Input() targetAttachment = 'top right';
  @Input() attachment = 'top left';

  @Output() tooltipToggle: EventEmitter<any> = new EventEmitter();

  public toggleSubscription: Subscription;

  public constructor(private element: ElementRef) {}

  public ngOnInit(): void {
    if (this.tooltipTarget) {
      this.tooltipTarget.setupTooltip(this.element.nativeElement, this.attachment, this.targetAttachment);
      this.toggleSubscription = this.tooltipTarget.tooltipToggle.subscribe((toggle: any) => this.tooltipToggle.emit(toggle));
    }
  }

  public ngOnDestroy(): void {
    if (this.toggleSubscription) {
      this.toggleSubscription.unsubscribe();
    }
  }
}
