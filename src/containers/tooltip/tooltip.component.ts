import {Component, Input, Output, EventEmitter, ViewChild, NgZone, OnDestroy} from '@angular/core';
import {animate, trigger, state, style, transition} from '@angular/animations';
import * as Tether from 'tether';

const tooltipSpeed = 250;
const easeOutQuart = 'cubic-bezier(0.165, 0.840, 0.440, 1.000)';

const opacityOff = style({
  opacity: 0
});
const opacityOn = style({
  opacity: 1
});

const SELECTOR = 'tooltip';

@Component({
  selector: SELECTOR,
  templateUrl: './tooltip.html',
  animations: [
    trigger('tooltipState', [
      state('inactive, expanded', opacityOff),
      state('active', opacityOn),
      transition('* => active', animate(`${tooltipSpeed}ms ${easeOutQuart}`)),
      transition('* => inactive', animate(`${tooltipSpeed}ms ${easeOutQuart}`))
    ])
  ],
  styleUrls: ['./tooltip.scss']
})
export class TooltipComponent implements OnDestroy {
  @ViewChild('container') container: any;

  @Input() public cssClass = '';

  @Input() public tutorialIndex: number;
  @Input() public first = false;
  @Input() public last = false;

  @Input() attachment = 'top left';
  @Input() targetAttachment = 'top right';

  @Output() tooltipToggle: EventEmitter<any> = new EventEmitter();
  @Output() tooltipNavigate: EventEmitter<any> = new EventEmitter();

  public tooltipState = 'inactive';
  public active = false;
  public isTutoring = false;

  private target: HTMLElement;
  private tether: any;

  private disableTimeout: any;
  private enableTimeout: any;

  public constructor(private zone: NgZone) {}

  public setupTooltip(target: HTMLElement, attachment: string, targetAttachment: string): void {
    this.target = target;

    this.attachment = attachment;
    this.targetAttachment = targetAttachment;

    this.initTooltip();
  }

  public destroyTooltip(): void {
    if (this.tether) {
      this.active = false;
      this.tether.destroy();
    }

    Array.prototype.forEach.call(document.querySelectorAll('body>.macro-tooltip'), (el: any) => el.parentNode.removeChild(el));
  }

  public clearTimeouts(): void {
    if (this.disableTimeout) {
      clearTimeout(this.disableTimeout);
    }
    if (this.enableTimeout) {
      clearTimeout(this.enableTimeout);
    }
  }

  public toggle(): void {
    this.active ? this.hide() : this.show();
  }

  public hide(): void {
    if (this.active) {
      this.tooltipState = 'inactive';
      this.tooltipToggle.emit(false);

      this.disableTimeout = setTimeout(() => this.active = false, tooltipSpeed);
    }
  }

  public show(): void {
    if (!this.active) {
      this.tooltipState = 'active';
      this.active = true;
      this.tooltipToggle.emit(true);

      this.zone.runOutsideAngular(() => this.enableTimeout = setTimeout(() => this.tether.position()));
    }
  }

  public initTooltip(): void {
    this.zone.runOutsideAngular(() => {
      this.tether = new Tether({
        element: this.container.nativeElement,
        target: this.target,
        attachment: this.attachment,
        targetAttachment: this.targetAttachment,
        constraints: [
          {
            to: 'window',
            attachment: 'together'
          }
        ]
      });
    });
  }

  public ngOnDestroy(): void {
    this.destroyTooltip();
    // super.ngOnDestroy();
  }
}

