import { Component, Input, Output, EventEmitter, ViewChild, NgZone } from '@angular/core';
import { animate, trigger, state, style, transition } from '@angular/animations';
import * as Tether from 'tether';
var tooltipSpeed = 250;
var easeOutQuart = 'cubic-bezier(0.165, 0.840, 0.440, 1.000)';
var opacityOff = style({
    opacity: 0
});
var opacityOn = style({
    opacity: 1
});
var SELECTOR = 'tooltip';
var TooltipComponent = (function () {
    function TooltipComponent(zone) {
        this.zone = zone;
        this.cssClass = '';
        this.first = false;
        this.last = false;
        this.attachment = 'top left';
        this.targetAttachment = 'top right';
        this.onTooltipToggle = new EventEmitter();
        this.onTooltipNavigate = new EventEmitter();
        this.tooltipState = 'inactive';
        this.active = false;
        this.isTutoring = false;
    }
    TooltipComponent.prototype.setupTooltip = function (target, attachment, targetAttachment) {
        this.target = target;
        this.attachment = attachment;
        this.targetAttachment = targetAttachment;
        this.initTooltip();
    };
    TooltipComponent.prototype.destroyTooltip = function () {
        if (this.tether) {
            this.active = false;
            this.tether.destroy();
        }
        Array.prototype.forEach.call(document.querySelectorAll('body>.macro-tooltip'), function (el) { return el.parentNode.removeChild(el); });
    };
    TooltipComponent.prototype.clearTimeouts = function () {
        if (this.disableTimeout) {
            clearTimeout(this.disableTimeout);
        }
        if (this.enableTimeout) {
            clearTimeout(this.enableTimeout);
        }
    };
    TooltipComponent.prototype.toggle = function () {
        this.active ? this.hide() : this.show();
    };
    TooltipComponent.prototype.hide = function () {
        var _this = this;
        if (this.active) {
            this.tooltipState = 'inactive';
            this.onTooltipToggle.emit(false);
            this.disableTimeout = setTimeout(function () { return _this.active = false; }, tooltipSpeed);
        }
    };
    TooltipComponent.prototype.show = function () {
        var _this = this;
        if (!this.active) {
            this.tooltipState = 'active';
            this.active = true;
            this.onTooltipToggle.emit(true);
            this.zone.runOutsideAngular(function () { return _this.enableTimeout = setTimeout(function () { return _this.tether.position(); }); });
        }
    };
    TooltipComponent.prototype.initTooltip = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.tether = new Tether({
                element: _this.container.nativeElement,
                target: _this.target,
                attachment: _this.attachment,
                targetAttachment: _this.targetAttachment,
                constraints: [
                    {
                        to: 'window',
                        attachment: 'together'
                    }
                ]
            });
        });
    };
    TooltipComponent.prototype.ngOnDestroy = function () {
        this.destroyTooltip();
        //super.ngOnDestroy();
    };
    TooltipComponent.decorators = [
        { type: Component, args: [{
                    selector: SELECTOR,
                    template: "\n    <div class=\"tooltip\" #container [@tooltipState]=\"tooltipState\" [ngClass]=\"cssClass\" [class.macro-tooltip--tutorial]=\"isTutoring\">\n      <div *ngIf=\"active\" class=\"tooltip__viewport\">\n        <div class=\"arrow\"></div>\n        <div class=\"tooltip__content\">\n          <ng-content></ng-content>\n          <div *ngIf=\"isTutoring\">\n            <button *ngIf=\"!first\" padding-lg-horizontal class=\"btn\" (click)=\"onTooltipNavigate.emit('prev')\">\n              Previous\n            </button>\n            <button *ngIf=\"!last\" padding-lg-horizontal class=\"btn\" (click)=\"onTooltipNavigate.emit('next')\">\n              Next\n            </button>\n            <button margin-left class=\"link-btn\" (click)=\"onTooltipNavigate.emit('end')\">\n              <strong *ngIf=\"first\">\n                Quit\n              </strong>\n              <strong *ngIf=\"last\">\n                Finish\n              </strong>\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
                    animations: [
                        trigger('tooltipState', [
                            state('inactive, expanded', opacityOff),
                            state('active', opacityOn),
                            transition('* => active', animate(tooltipSpeed + "ms " + easeOutQuart)),
                            transition('* => inactive', animate(tooltipSpeed + "ms " + easeOutQuart))
                        ])
                    ],
                    styles: ["\n    .tooltip{position:absolute;z-index:10000;max-width:380px;padding:1px;background-color:#fff;background-clip:padding-box;border:1px solid rgba(0,0,0,0.2);opacity:0;box-shadow:2px 2px 10px 0 rgba(0,0,0,0.3)}.tooltip.tether-element-attached-bottom.tether-target-attached-top{margin-bottom:25px;margin-top:-25px}.tooltip.tether-element-attached-bottom.tether-target-attached-top .arrow{border-bottom-width:0;border-top-color:rgba(0,0,0,0.25);bottom:-21px}.tooltip.tether-element-attached-bottom.tether-target-attached-top .arrow:after{content:\"\";bottom:1px;margin-left:-20px;border-bottom-width:0;border-top-color:#fff}.tooltip.tether-element-attached-bottom.tether-target-attached-top.tooltip--tutorial .arrow:after{border-top-color:#003d7c}.tooltip.tether-element-attached-top.tether-target-attached-bottom{margin-top:25px}.tooltip.tether-element-attached-top.tether-target-attached-bottom .arrow{border-top-width:0;border-bottom-color:rgba(0,0,0,0.25);top:-21px}.tooltip.tether-element-attached-top.tether-target-attached-bottom .arrow:after{content:\"\";top:1px;margin-left:-20px;border-top-width:0;border-bottom-color:#fff}.tooltip.tether-element-attached-top.tether-target-attached-bottom.tooltip--tutorial .arrow:after{border-bottom-color:color(brand-primary-dark)}.tooltip.tether-element-attached-right.tether-target-attached-left{margin-left:-25px}.tooltip.tether-element-attached-right.tether-target-attached-left .arrow{right:-21px;border-right-width:0;border-left-color:rgba(0,0,0,0.25)}.tooltip.tether-element-attached-right.tether-target-attached-left .arrow:after{content:\" \";right:1px;border-right-width:0;border-left-color:#fff;bottom:-20px}.tooltip.tether-element-attached-right.tether-target-attached-left.tooltip--tutorial .arrow:after{border-left-color:#003d7c}.tooltip.tether-element-attached-left.tether-target-attached-right{margin-left:25px}.tooltip.tether-element-attached-left.tether-target-attached-right .arrow{left:-21px;border-left-width:0;border-right-color:rgba(0,0,0,0.25)}.tooltip.tether-element-attached-left.tether-target-attached-right .arrow:after{content:\" \";left:1px;bottom:-20px;border-left-width:0;border-right-color:#fff}.tooltip.tether-element-attached-left.tether-target-attached-right.tooltip--tutorial .arrow:after{border-right-color:#003d7c}.tooltip__content{padding:16px}.tooltip__content p:last-child,.tooltip__content ul:last-child{margin-bottom:0}.tooltip .arrow{border-width:21px}.tooltip .arrow,.tooltip .arrow:after{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid}.tooltip .arrow:after{border-width:20px;content:\"\"}.tooltip.tether-target-attached-top.tether-target-attached-middle .arrow,.tooltip.tether-target-attached-bottom.tether-target-attached-middle .arrow{left:50%;margin-left:-21px}.tooltip.tether-element-attached-left.tether-target-attached-right.tether-element-attached-top,.tooltip.tether-element-attached-right.tether-target-attached-left.tether-element-attached-top{margin-top:-15px}.tooltip.tether-element-attached-left.tether-target-attached-right.tether-element-attached-top .arrow,.tooltip.tether-element-attached-right.tether-target-attached-left.tether-element-attached-top .arrow{top:15px}.tooltip.tether-element-attached-left.tether-target-attached-right.tether-element-attached-bottom,.tooltip.tether-element-attached-right.tether-target-attached-left.tether-element-attached-bottom{margin-top:15px}.tooltip.tether-element-attached-left.tether-target-attached-right.tether-element-attached-bottom .arrow,.tooltip.tether-element-attached-right.tether-target-attached-left.tether-element-attached-bottom .arrow{top:auto;bottom:15px}.tooltip.tether-element-attached-top.tether-target-attached-bottom.tether-element-attached-right .arrow,.tooltip.tether-element-attached-bottom.tether-target-attached-top.tether-element-attached-right .arrow{left:auto;right:15px}.tooltip.tether-element-attached-top.tether-target-attached-bottom.tether-element-attached-left .arrow,.tooltip.tether-element-attached-bottom.tether-target-attached-top.tether-element-attached-left .arrow{left:15px}.tooltip--tutorial{background:#003d7c}.tooltip--tutorial,.tooltip--tutorial h1,.tooltip--tutorial .h1,.tooltip--tutorial h2,.tooltip--tutorial .h2,.tooltip--tutorial h3,.tooltip--tutorial .h2,.tooltip--tutorial h4,.tooltip--tutorial .h4,.tooltip--tutorial h5,.tooltip--tutorial .h5,.tooltip--tutorial .link-btn{color:#fff}\n  "]
                },] },
    ];
    /** @nocollapse */
    TooltipComponent.ctorParameters = function () { return [
        { type: NgZone, },
    ]; };
    TooltipComponent.propDecorators = {
        "container": [{ type: ViewChild, args: ['container',] },],
        "cssClass": [{ type: Input },],
        "tutorialIndex": [{ type: Input },],
        "first": [{ type: Input },],
        "last": [{ type: Input },],
        "attachment": [{ type: Input },],
        "targetAttachment": [{ type: Input },],
        "onTooltipToggle": [{ type: Output },],
        "onTooltipNavigate": [{ type: Output },],
    };
    return TooltipComponent;
}());
export { TooltipComponent };
//# sourceMappingURL=tooltip.component.js.map