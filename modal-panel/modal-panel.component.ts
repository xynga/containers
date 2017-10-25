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
    templateUrl: './modal-panel.html',
    styleUrls: ['./modal-panel.scss'],
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
