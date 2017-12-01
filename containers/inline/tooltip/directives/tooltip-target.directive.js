import { Directive, Input, Output, EventEmitter, ElementRef } from '@angular/core';
var SELECTOR = '[tooltipTarget]';
var TooltipTargetDirective = (function () {
    function TooltipTargetDirective(element) {
        this.element = element;
        this.targetAttachment = 'top right';
        this.attachment = 'top left';
        this.onTooltipToggle = new EventEmitter();
    }
    TooltipTargetDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.tooltipTarget) {
            this.tooltipTarget.setupTooltip(this.element.nativeElement, this.attachment, this.targetAttachment);
            this.toggleSubscription = this.tooltipTarget.onTooltipToggle.subscribe(function (toggle) { return _this.onTooltipToggle.emit(toggle); });
        }
    };
    TooltipTargetDirective.prototype.ngOnDestroy = function () {
        if (this.toggleSubscription) {
            this.toggleSubscription.unsubscribe();
        }
    };
    TooltipTargetDirective.decorators = [
        { type: Directive, args: [{
                    selector: SELECTOR
                },] },
    ];
    /** @nocollapse */
    TooltipTargetDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    TooltipTargetDirective.propDecorators = {
        'tooltipTarget': [{ type: Input },],
        'targetAttachment': [{ type: Input },],
        'attachment': [{ type: Input },],
        'onTooltipToggle': [{ type: Output },],
    };
    return TooltipTargetDirective;
}());
export { TooltipTargetDirective };
//# sourceMappingURL=tooltip-target.directive.js.map