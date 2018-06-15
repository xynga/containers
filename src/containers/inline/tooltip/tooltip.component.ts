import {Component, Input, Output, EventEmitter, ViewChild, NgZone, OnDestroy} from '@angular/core';
import {animate, trigger, state, style, transition} from '@angular/animations';
import * as Tether from 'tether';

const tooltipSpeed: number = 250;
const easeOutQuart: string = 'cubic-bezier(0.165, 0.840, 0.440, 1.000)';

const opacityOff = style({
  opacity: 0
});
const opacityOn = style({
  opacity: 1
});

const SELECTOR: string = 'tooltip';

@Component({
  selector: SELECTOR,
  template: `
    <div class="tooltip" #container [@tooltipState]="tooltipState" [ngClass]="cssClass" [class.macro-tooltip--tutorial]="isTutoring">
      <div *ngIf="active" class="tooltip__viewport">
        <div class="arrow"></div>
        <div class="tooltip__content">
          <ng-content></ng-content>
          <div *ngIf="isTutoring">
            <button *ngIf="!first" padding-lg-horizontal class="btn" (click)="onTooltipNavigate.emit('prev')">
              Previous
            </button>
            <button *ngIf="!last" padding-lg-horizontal class="btn" (click)="onTooltipNavigate.emit('next')">
              Next
            </button>
            <button margin-left class="link-btn" (click)="onTooltipNavigate.emit('end')">
              <strong *ngIf="first">
                Quit
              </strong>
              <strong *ngIf="last">
                Finish
              </strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('tooltipState', [
      state('inactive, expanded', opacityOff),
      state('active', opacityOn),
      transition('* => active', animate(`${tooltipSpeed}ms ${easeOutQuart}`)),
      transition('* => inactive', animate(`${tooltipSpeed}ms ${easeOutQuart}`))
    ])
  ],
  styles: [`
    .tooltip{position:absolute;z-index:10000;max-width:380px;padding:1px;background-color:#fff;background-clip:padding-box;border:1px solid rgba(0,0,0,0.2);opacity:0;box-shadow:2px 2px 10px 0 rgba(0,0,0,0.3)}.tooltip.tether-element-attached-bottom.tether-target-attached-top{margin-bottom:25px;margin-top:-25px}.tooltip.tether-element-attached-bottom.tether-target-attached-top .arrow{border-bottom-width:0;border-top-color:rgba(0,0,0,0.25);bottom:-21px}.tooltip.tether-element-attached-bottom.tether-target-attached-top .arrow:after{content:"";bottom:1px;margin-left:-20px;border-bottom-width:0;border-top-color:#fff}.tooltip.tether-element-attached-bottom.tether-target-attached-top.tooltip--tutorial .arrow:after{border-top-color:#003d7c}.tooltip.tether-element-attached-top.tether-target-attached-bottom{margin-top:25px}.tooltip.tether-element-attached-top.tether-target-attached-bottom .arrow{border-top-width:0;border-bottom-color:rgba(0,0,0,0.25);top:-21px}.tooltip.tether-element-attached-top.tether-target-attached-bottom .arrow:after{content:"";top:1px;margin-left:-20px;border-top-width:0;border-bottom-color:#fff}.tooltip.tether-element-attached-top.tether-target-attached-bottom.tooltip--tutorial .arrow:after{border-bottom-color:color(brand-primary-dark)}.tooltip.tether-element-attached-right.tether-target-attached-left{margin-left:-25px}.tooltip.tether-element-attached-right.tether-target-attached-left .arrow{right:-21px;border-right-width:0;border-left-color:rgba(0,0,0,0.25)}.tooltip.tether-element-attached-right.tether-target-attached-left .arrow:after{content:" ";right:1px;border-right-width:0;border-left-color:#fff;bottom:-20px}.tooltip.tether-element-attached-right.tether-target-attached-left.tooltip--tutorial .arrow:after{border-left-color:#003d7c}.tooltip.tether-element-attached-left.tether-target-attached-right{margin-left:25px}.tooltip.tether-element-attached-left.tether-target-attached-right .arrow{left:-21px;border-left-width:0;border-right-color:rgba(0,0,0,0.25)}.tooltip.tether-element-attached-left.tether-target-attached-right .arrow:after{content:" ";left:1px;bottom:-20px;border-left-width:0;border-right-color:#fff}.tooltip.tether-element-attached-left.tether-target-attached-right.tooltip--tutorial .arrow:after{border-right-color:#003d7c}.tooltip__content{padding:16px}.tooltip__content p:last-child,.tooltip__content ul:last-child{margin-bottom:0}.tooltip .arrow{border-width:21px}.tooltip .arrow,.tooltip .arrow:after{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid}.tooltip .arrow:after{border-width:20px;content:""}.tooltip.tether-target-attached-top.tether-target-attached-middle .arrow,.tooltip.tether-target-attached-bottom.tether-target-attached-middle .arrow{left:50%;margin-left:-21px}.tooltip.tether-element-attached-left.tether-target-attached-right.tether-element-attached-top,.tooltip.tether-element-attached-right.tether-target-attached-left.tether-element-attached-top{margin-top:-15px}.tooltip.tether-element-attached-left.tether-target-attached-right.tether-element-attached-top .arrow,.tooltip.tether-element-attached-right.tether-target-attached-left.tether-element-attached-top .arrow{top:15px}.tooltip.tether-element-attached-left.tether-target-attached-right.tether-element-attached-bottom,.tooltip.tether-element-attached-right.tether-target-attached-left.tether-element-attached-bottom{margin-top:15px}.tooltip.tether-element-attached-left.tether-target-attached-right.tether-element-attached-bottom .arrow,.tooltip.tether-element-attached-right.tether-target-attached-left.tether-element-attached-bottom .arrow{top:auto;bottom:15px}.tooltip.tether-element-attached-top.tether-target-attached-bottom.tether-element-attached-right .arrow,.tooltip.tether-element-attached-bottom.tether-target-attached-top.tether-element-attached-right .arrow{left:auto;right:15px}.tooltip.tether-element-attached-top.tether-target-attached-bottom.tether-element-attached-left .arrow,.tooltip.tether-element-attached-bottom.tether-target-attached-top.tether-element-attached-left .arrow{left:15px}.tooltip--tutorial{background:#003d7c}.tooltip--tutorial,.tooltip--tutorial h1,.tooltip--tutorial .h1,.tooltip--tutorial h2,.tooltip--tutorial .h2,.tooltip--tutorial h3,.tooltip--tutorial .h2,.tooltip--tutorial h4,.tooltip--tutorial .h4,.tooltip--tutorial h5,.tooltip--tutorial .h5,.tooltip--tutorial .link-btn{color:#fff}
  `]
})
export class TooltipComponent implements OnDestroy {
  @ViewChild('container') container: any;

  @Input() public cssClass: string = '';

  @Input() public tutorialIndex: number;
  @Input() public first: boolean = false;
  @Input() public last: boolean = false;

  @Input() attachment: string = 'top left';
  @Input() targetAttachment: string = 'top right';

  @Output() onTooltipToggle: EventEmitter<any> = new EventEmitter();
  @Output() onTooltipNavigate: EventEmitter<any> = new EventEmitter();

  public tooltipState: string = 'inactive';
  public active: boolean = false;
  public isTutoring: boolean = false;

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

    Array.prototype.forEach.call(document.querySelectorAll('body>.macro-tooltip'), (el:any) => el.parentNode.removeChild(el));
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
      this.onTooltipToggle.emit(false);

      this.disableTimeout = setTimeout(() => this.active = false, tooltipSpeed);
    }
  }

  public show(): void {
    if (!this.active) {
      this.tooltipState = 'active';
      this.active = true;
      this.onTooltipToggle.emit(true);

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
    //super.ngOnDestroy();
  }
}

