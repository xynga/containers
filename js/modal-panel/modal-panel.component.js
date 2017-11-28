"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const animations_1 = require("@angular/animations");
const router_1 = require("@angular/router");
const body_directive_1 = require("./directives/body.directive");
const INACTIVE = 'inactive';
const ACTIVE = 'active';
const EXPANDED = 'expanded';
const modalSpeed = 500;
const opacityOff = animations_1.style({ opacity: 0 });
const opacityOn = animations_1.style({ opacity: 1 });
const slideRight = animations_1.style({ transform: 'translateX(100%)' });
const slideNone = animations_1.style({ transform: 'translateX(0)' });
const slideLeft = animations_1.style({ transform: 'translateX(-100%)' });
const easeOutQuart = 'cubic-bezier(0.165, 0.840, 0.440, 1.000)';
const animateDefault = animations_1.animate(`${modalSpeed}ms ${easeOutQuart}`);
const SELECTOR = 'modal-panel';
let ModalPanelComponent = class ModalPanelComponent {
    constructor(body, router) {
        this.body = body;
        this.router = router;
        this.closed = new core_1.EventEmitter();
        this.detailClosed = new core_1.EventEmitter();
        this.panelOpen = false;
        this.panelState = INACTIVE;
        this.isAnimating = false;
        this.routerEventsMonitoring = true;
    }
    set open(open) {
        if (undefined !== open && null !== open) {
            if (!this.panelOpen && open) {
                this.activate(0);
            }
            else if (this.panelOpen && !open) {
                this.close();
            }
            this.routerEventsMonitoring = false; // because we got an @Input value we were not accessed vai a route
        }
    }
    ;
    set detailOpen(open) {
        if (undefined !== open && null !== open) {
            if (open) {
                this.panelState = EXPANDED;
                if (!this.panelOpen) {
                    this.activate(0);
                }
            }
            else if (this.isExpanded) {
                this.panelState = ACTIVE;
                this.closeDetail();
            }
            this.routerEventsMonitoring = false; // because we got an @Input value we were not accessed vai a route
        }
    }
    ;
    get isExpanded() {
        return EXPANDED === this.panelState;
    }
    ngOnInit() {
        if (this.routerEventsMonitoring) {
            this.activate(0);
            this.routerEventsSubscription = this.router.events.subscribe((event) => {
                if (event instanceof router_1.NavigationStart) {
                    this.activate(modalSpeed);
                }
            });
        }
    }
    onBackdropClicked() {
        this.open = false;
    }
    onCloseClicked() {
        this.close();
    }
    onCloseDetailClicked() {
        this.detailOpen = false;
    }
    activate(timer) {
        if (!this.panelOpen) {
            this.body.modalOpen = true;
            this.panelOpen = true;
            this.panelState = INACTIVE;
            setTimeout(() => {
                this.panelState = ACTIVE;
            }, timer);
        }
    }
    close() {
        if (this.confirmClose) {
            this.confirmCloseSubscription = this.confirmClose().subscribe((confirmed) => this.deactivate(confirmed));
        }
        else {
            this.deactivate(true);
        }
    }
    deactivate(confirmed) {
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
    closeDetail() {
        if (this.confirmDetailClose) {
            this.confirmDetailCloseSubscription = this.confirmDetailClose().subscribe((confirmed) => this.unexpand(confirmed));
        }
        else {
            this.unexpand(true);
        }
    }
    unexpand(confirmed) {
        if (confirmed) {
            this.panelState = ACTIVE;
            this.detailClosed.emit();
        }
        if (this.confirmDetailCloseSubscription) {
            this.confirmDetailCloseSubscription.unsubscribe();
        }
    }
    ngOnDestroy() {
        this.body.modalOpen = false;
        if (this.routerEventsSubscription) {
            this.routerEventsSubscription.unsubscribe();
        }
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ModalPanelComponent.prototype, "open", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ModalPanelComponent.prototype, "detailOpen", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Function)
], ModalPanelComponent.prototype, "confirmClose", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Function)
], ModalPanelComponent.prototype, "confirmDetailClose", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ModalPanelComponent.prototype, "closed", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ModalPanelComponent.prototype, "detailClosed", void 0);
ModalPanelComponent = __decorate([
    core_1.Component({
        selector: SELECTOR,
        templateUrl: './modal-panel.html',
        styleUrls: ['./modal-panel.scss'],
        encapsulation: core_1.ViewEncapsulation.None,
        animations: [
            animations_1.trigger('containerState', [
                animations_1.state('inactive, active', slideNone),
                animations_1.state('expanded', slideLeft),
                animations_1.transition('* => expanded', animateDefault),
                animations_1.transition('expanded => *', animateDefault)
            ]),
            animations_1.trigger('backdropState', [
                animations_1.state('inactive', opacityOff),
                animations_1.state('active, expanded', opacityOn),
                animations_1.transition('* => active', animateDefault),
                animations_1.transition('* => inactive', animateDefault)
            ]),
            animations_1.trigger('modalState', [
                animations_1.state('inactive, expanded', slideRight),
                animations_1.state('active', slideNone),
                animations_1.transition('* => active', animateDefault),
                animations_1.transition('* => inactive', animateDefault),
                animations_1.transition('* => expanded', animateDefault)
            ]),
            animations_1.trigger('modalDetailOverlayState', [
                animations_1.state('inactive, active', opacityOff),
                animations_1.state('expanded', opacityOn),
                animations_1.transition('* => expanded', animateDefault),
                animations_1.transition('expanded => *', animateDefault)
            ])
        ]
    }),
    __metadata("design:paramtypes", [body_directive_1.BodyDirective, router_1.Router])
], ModalPanelComponent);
exports.ModalPanelComponent = ModalPanelComponent;
