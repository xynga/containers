import { Directive, HostBinding } from '@angular/core';
var SELECTOR = 'body';
var BodyDirective = (function () {
    function BodyDirective() {
        this.modalOpen = false;
    }
    BodyDirective.decorators = [
        { type: Directive, args: [{
                    selector: SELECTOR
                },] },
    ];
    /** @nocollapse */
    BodyDirective.ctorParameters = function () { return []; };
    BodyDirective.propDecorators = {
        'modalOpen': [{ type: HostBinding, args: ['class.has-modal',] },],
    };
    return BodyDirective;
}());
export { BodyDirective };
//# sourceMappingURL=body.directive.js.map