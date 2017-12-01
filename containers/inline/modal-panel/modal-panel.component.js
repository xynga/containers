import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router, NavigationStart } from '@angular/router';
import { BodyDirective } from "./directives/body.directive";
var INACTIVE = 'inactive';
var ACTIVE = 'active';
var EXPANDED = 'expanded';
var modalSpeed = 500;
var opacityOff = style({ opacity: 0 });
var opacityOn = style({ opacity: 1 });
var slideRight = style({ transform: 'translateX(100%)' });
var slideNone = style({ transform: 'translateX(0)' });
var slideLeft = style({ transform: 'translateX(-100%)' });
var easeOutQuart = 'cubic-bezier(0.165, 0.840, 0.440, 1.000)';
var animateDefault = animate(modalSpeed + "ms " + easeOutQuart);
var SELECTOR = 'modal-panel';
var ModalPanelComponent = (function () {
    function ModalPanelComponent(body, router) {
        this.body = body;
        this.router = router;
        this.closed = new EventEmitter();
        this.detailClosed = new EventEmitter();
        this.panelOpen = false;
        this.panelState = INACTIVE;
        this.isAnimating = false;
        this.routerEventsMonitoring = true;
    }
    Object.defineProperty(ModalPanelComponent.prototype, "open", {
        set: function (open) {
            if (undefined !== open && null !== open) {
                if (!this.panelOpen && open) {
                    this.activate(0);
                }
                else if (this.panelOpen && !open) {
                    this.close();
                }
                this.routerEventsMonitoring = false; // because we got an @Input value we were not accessed vai a route
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ModalPanelComponent.prototype, "detailOpen", {
        set: function (open) {
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
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ModalPanelComponent.prototype, "isExpanded", {
        get: function () {
            return EXPANDED === this.panelState;
        },
        enumerable: true,
        configurable: true
    });
    ModalPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.routerEventsMonitoring) {
            this.activate(0);
            this.routerEventsSubscription = this.router.events.subscribe(function (event) {
                if (event instanceof NavigationStart) {
                    _this.activate(modalSpeed);
                }
            });
        }
    };
    ModalPanelComponent.prototype.onBackdropClicked = function () {
        this.open = false;
    };
    ModalPanelComponent.prototype.onCloseClicked = function () {
        this.close();
    };
    ModalPanelComponent.prototype.onCloseDetailClicked = function () {
        this.detailOpen = false;
    };
    ModalPanelComponent.prototype.activate = function (timer) {
        var _this = this;
        if (!this.panelOpen) {
            this.body.modalOpen = true;
            this.panelOpen = true;
            this.panelState = INACTIVE;
            setTimeout(function () {
                _this.panelState = ACTIVE;
            }, timer);
        }
    };
    ModalPanelComponent.prototype.close = function () {
        var _this = this;
        if (this.confirmClose) {
            this.confirmCloseSubscription = this.confirmClose().subscribe(function (confirmed) { return _this.deactivate(confirmed); });
        }
        else {
            this.deactivate(true);
        }
    };
    ModalPanelComponent.prototype.deactivate = function (confirmed) {
        var _this = this;
        if (confirmed) {
            if (!this.isAnimating) {
                this.isAnimating = true;
                this.panelState = INACTIVE;
                setTimeout(function () {
                    _this.isAnimating = false;
                    _this.panelOpen = false;
                    _this.body.modalOpen = false;
                    _this.closed.emit();
                }, modalSpeed);
            }
        }
        if (this.confirmCloseSubscription) {
            this.confirmCloseSubscription.unsubscribe();
        }
    };
    ModalPanelComponent.prototype.closeDetail = function () {
        var _this = this;
        if (this.confirmDetailClose) {
            this.confirmDetailCloseSubscription = this.confirmDetailClose().subscribe(function (confirmed) { return _this.unexpand(confirmed); });
        }
        else {
            this.unexpand(true);
        }
    };
    ModalPanelComponent.prototype.unexpand = function (confirmed) {
        if (confirmed) {
            this.panelState = ACTIVE;
            this.detailClosed.emit();
        }
        if (this.confirmDetailCloseSubscription) {
            this.confirmDetailCloseSubscription.unsubscribe();
        }
    };
    ModalPanelComponent.prototype.ngOnDestroy = function () {
        this.body.modalOpen = false;
        if (this.routerEventsSubscription) {
            this.routerEventsSubscription.unsubscribe();
        }
    };
    ModalPanelComponent.decorators = [
        { type: Component, args: [{
                    selector: SELECTOR,
                    template: "\n      <div class=\"modal-container\" *ngIf=\"panelOpen\" [@containerState]=\"panelState\" [class.is-expanded]=\"isExpanded\">\n        <div class=\"modal-backdrop\" (click)=\"onBackdropClicked()\" [@backdropState]=\"panelState\"></div>\n        <div class=\"modal-panel\" [@modalState]=\"panelState\">\n          <!--<button class = \"button-close\" (click)=\"onCloseClicked()\" *ngIf=\"panelState === 'active'\">Close</button>-->\n          <ng-content></ng-content>\n          <span class=\"modal-detail-overlay\" *ngIf=\"panelState === 'expanded'\" [@modalDetailOverlayState]=\"panelState\" (click)=\"onCloseDetailClicked()\"></span>\n        </div>\n        <div class=\"modal-detail-container\">\n          <ng-content select=\".modal-detail\"></ng-content>\n        </div>\n      </div>\n    ",
                    styles: ["\n      modal-panel{position:relative;z-index:4000}.modal-container{position:fixed;width:100%;height:100%;left:0;top:0}.modal-backdrop{position:fixed;top:0;left:0;width:100%;height:100%;display:block;background:rgba(0,0,0,0.4);opacity:0.01;will-change:opacity}.hide-backdrop .modal-backdrop{display:none !important}.modal-panel{background-color:#f0efef;box-shadow:2px 2px 10px 0 rgba(0,0,0,0.3);padding:47px 40px 40px;position:fixed;width:400px;max-width:100%;height:100%;right:0;top:0;transform:translateX(100%);will-change:transform;overflow:auto;z-index:99}.is-expanded .modal-panel{box-shadow:none}.modal-panel-large .modal-panel{background:#fff;width:calc(100% - 400px)}.modal-panel-medium .modal-panel{background:#fff;width:calc(100% - 400px)}.modal-detail-overlay{position:fixed;top:0;left:0;height:9999px;width:100%;background:rgba(0,0,0,0.4);z-index:99;opacity:0;box-shadow:inset -5px 0px 8px -4px rgba(0,0,0,0.4);transition:opacity 0.5s}.is-expanded .modal-detail-overlay.ng-animating{opacity:1}.modal-detail-container{box-sizing:border-box;position:fixed;left:0;top:0;width:100%;height:100%;background:#fff;overflow:auto;padding-left:400px;transform:translateX(100%);z-index:55}.modal-detail-container .modal-detail{padding:32px;min-height:100%;background-color:#f0efef}.modal-panel-large .modal-detail-container{background-color:#f0efef;padding:0}.modal-panel-large .modal-detail-container .modal-detail{width:400px;margin-left:auto}.button-close{display:block;position:absolute;top:19px;right:20px}@media screen and (min-width: 64em){.div-style{width:100%;display:inline-block;*display:inline;zoom:1;letter-spacing:normal;word-spacing:normal;vertical-align:top;text-rendering:auto}}\n    "],
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
                },] },
    ];
    /** @nocollapse */
    ModalPanelComponent.ctorParameters = function () { return [
        { type: BodyDirective, },
        { type: Router, },
    ]; };
    ModalPanelComponent.propDecorators = {
        "open": [{ type: Input },],
        "detailOpen": [{ type: Input },],
        "confirmClose": [{ type: Input },],
        "confirmDetailClose": [{ type: Input },],
        "closed": [{ type: Output },],
        "detailClosed": [{ type: Output },],
    };
    return ModalPanelComponent;
}());
export { ModalPanelComponent };
//# sourceMappingURL=modal-panel.component.js.map