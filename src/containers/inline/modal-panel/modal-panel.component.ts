import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router, NavigationStart, RouterModule} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {BodyDirective} from "./directives/body.directive";


const INACTIVE: string = 'inactive';
const ACTIVE: string = 'active';
const EXPANDED: string = 'expanded';

const modalSpeed: number = 500;

const opacityOff = style({opacity: 0});
const opacityOn = style({opacity: 1});

const slideRight = style({transform: 'translateX(100%)'});
const slideNone = style({transform: 'translateX(0)'});
const slideLeft = style({transform: 'translateX(-100%)'});

const easeOutQuart: string = 'cubic-bezier(0.165, 0.840, 0.440, 1.000)';

const animateDefault = animate(`${modalSpeed}ms ${easeOutQuart}`);

const SELECTOR: string = 'modal-panel';

@Component({
    selector: SELECTOR,
    template: `
      <div class="modal-container" *ngIf="panelOpen" [@containerState]="panelState" [class.is-expanded]="isExpanded">
        <div class="modal-backdrop" (click)="onBackdropClicked()" [@backdropState]="panelState"></div>
        <div class="modal-panel" [@modalState]="panelState">
          <!--<button class = "button-close" (click)="onCloseClicked()" *ngIf="panelState === 'active'">Close</button>-->
          <ng-content></ng-content>
          <span class="modal-detail-overlay" *ngIf="panelState === 'expanded'" [@modalDetailOverlayState]="panelState" (click)="onCloseDetailClicked()"></span>
        </div>
        <div class="modal-detail-container">
          <ng-content select=".modal-detail"></ng-content>
        </div>
      </div>
    `,
    styles: [`
      *{box-sizing:border-box}modal-panel{position:relative;z-index:4000}.modal-container{position:fixed;width:100%;height:100%;left:0;top:0}.modal-backdrop{position:fixed;top:0;left:0;width:100%;height:100%;display:block;background:rgba(0,0,0,0.4);opacity:0.01;will-change:opacity}.hide-backdrop .modal-backdrop{display:none !important}.modal-panel{background-color:#f0efef;box-shadow:2px 2px 10px 0 rgba(0,0,0,0.3);padding:47px 40px 40px;position:fixed;width:400px;max-width:100%;height:100%;right:0;top:0;transform:translateX(100%);will-change:transform;overflow:auto;z-index:99}.is-expanded .modal-panel{box-shadow:none}.modal-panel-large .modal-panel{background:#fff;width:calc(100% - 400px)}.modal-panel-medium .modal-panel{background:#fff;width:calc(100% - 400px)}.modal-detail-overlay{position:fixed;top:0;left:0;height:9999px;width:100%;background:rgba(0,0,0,0.4);z-index:99;opacity:0;box-shadow:inset -5px 0px 8px -4px rgba(0,0,0,0.4);transition:opacity 0.5s}.is-expanded .modal-detail-overlay.ng-animating{opacity:1}.modal-detail-container{box-sizing:border-box;position:fixed;left:0;top:0;width:100%;height:100%;background:#fff;overflow:auto;padding-left:400px;transform:translateX(100%);z-index:55}.modal-detail-container .modal-detail{padding:32px;min-height:100%;background-color:#f0efef}.modal-panel-large .modal-detail-container{background-color:#f0efef;padding:0}.modal-panel-large .modal-detail-container .modal-detail{width:400px;margin-left:auto}.button-close{display:block;position:absolute;top:19px;right:20px}@media screen and (min-width: 64em){.div-style{width:100%;display:inline-block;*display:inline;zoom:1;letter-spacing:normal;word-spacing:normal;vertical-align:top;text-rendering:auto}}
    `],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('containerState', [
            state('inactive, active', slideNone),
            state('expanded', slideLeft),
            transition('* => expanded', animateDefault),
            transition('expanded => *', animateDefault)
        ]),
        trigger('backdropState', [
            state('inactive', opacityOff),
            state('active, expanded', opacityOn),
            transition('* => active', animateDefault),
            transition('* => inactive', animateDefault)
        ]),
        trigger('modalState', [
            state('inactive, expanded', slideRight),
            state('active', slideNone),
            transition('* => active', animateDefault),
            transition('* => inactive', animateDefault),
            transition('* => expanded', animateDefault)
        ]),
        trigger('modalDetailOverlayState', [
            state('inactive, active', opacityOff),
            state('expanded', opacityOn),
            transition('* => expanded', animateDefault),
            transition('expanded => *', animateDefault)
        ])
    ]
})
export class ModalPanelComponent implements OnInit, OnDestroy {
    @Input()
    public set open(open: boolean) {
        if (undefined !== open && null !== open) {
            if (!this.panelOpen && open) {
                this.activate(0);
            }
            else if (this.panelOpen && !open) {
                this.close();
            }

            this.routerEventsMonitoring = false; // because we got an @Input value we were not accessed vai a route
        }
    };

    @Input()
    public set detailOpen(open: boolean) {
        if (undefined !== open && null !== open) {
            if (open) {
                this.panelState = EXPANDED;

                if (!this.panelOpen) {
                    this.activate(0);
                }
            }
            else if (this.isExpanded){
                this.panelState = ACTIVE;
                this.closeDetail();
            }

            this.routerEventsMonitoring = false; // because we got an @Input value we were not accessed vai a route
        }
    };

    @Input() public confirmClose: () => Observable<boolean>;
    @Input() public confirmDetailClose: () => Observable<boolean>;

    @Output() public closed = new EventEmitter();

    @Output() public detailClosed = new EventEmitter();

    public panelOpen: boolean = false;

    public panelState: string = INACTIVE;

    private isAnimating: boolean = false;

    private confirmCloseSubscription: Subscription;
    private confirmDetailCloseSubscription: Subscription;

    private routerEventsSubscription: Subscription;
    private routerEventsMonitoring: boolean = true;

    public get isExpanded(): boolean {
        return EXPANDED === this.panelState;
    }

    public constructor(private body: BodyDirective, private router: Router) {}

    public ngOnInit(): void {
        if (this.routerEventsMonitoring) {
            this.activate(0);

            this.routerEventsSubscription = this.router.events.subscribe((event) => {
                if (event instanceof NavigationStart) {
                    this.activate(modalSpeed);
                }
            });
        }
    }

    public onBackdropClicked(): void {
        this.open = false;
    }

    public onCloseClicked(): void {
        this.close();
    }

    public onCloseDetailClicked(): void {
        this.detailOpen = false;
    }

    public activate(timer: number): void {
        if (!this.panelOpen) {
            this.body.modalOpen = true;
            this.panelOpen = true;
            this.panelState = INACTIVE;

            setTimeout(() => {
                this.panelState = ACTIVE;
            }, timer);
        }
    }

    public close(): void {
        if (this.confirmClose) {
            this.confirmCloseSubscription = this.confirmClose().subscribe((confirmed: boolean) => this.deactivate(confirmed));
        }
        else {
            this.deactivate(true);
        }
    }

    public deactivate(confirmed: boolean): void {
        if (confirmed) {
            if (!this.isAnimating) {
                this.isAnimating = true;
                this.panelState = INACTIVE;

                setTimeout(() => {
                    this.isAnimating = false;
                    this.panelOpen = false;
                    this.body.modalOpen = false;
                    this.closed.emit();
                }, modalSpeed);
            }
        }

        if (this.confirmCloseSubscription) {
            this.confirmCloseSubscription.unsubscribe();
        }
    }

    public closeDetail(): void {
        if (this.confirmDetailClose) {
            this.confirmDetailCloseSubscription = this.confirmDetailClose().subscribe((confirmed: boolean) => this.unexpand(confirmed));
        }
        else {
            this.unexpand(true);
        }
    }

    public unexpand(confirmed: boolean): void {
        if (confirmed) {
            this.panelState = ACTIVE;
            this.detailClosed.emit();
        }

        if (this.confirmDetailCloseSubscription) {
            this.confirmDetailCloseSubscription.unsubscribe();
        }
    }

    public ngOnDestroy(): void {
        this.body.modalOpen = false;

        if (this.routerEventsSubscription) {
            this.routerEventsSubscription.unsubscribe();
        }
    }
}
