import { Component, Input, ViewChild } from '@angular/core';
var SELECTOR = 'collapse';
var CollapseComponent = (function () {
    function CollapseComponent() {
        this._isActive = false;
        this.collapseHeight = 0;
    }
    Object.defineProperty(CollapseComponent.prototype, "isActive", {
        set: function (isActive) {
            if (isActive) {
                this.activateCollapse();
            }
            else {
                this.deactivateCollapse();
            }
        },
        enumerable: true,
        configurable: true
    });
    CollapseComponent.prototype.ngOnInit = function () {
        if (this._isActive) {
            this.resetHeight();
        }
    };
    CollapseComponent.prototype.resetHeight = function () {
        this.collapseHeight = 0;
    };
    CollapseComponent.prototype.runCollapseOpen = function () {
        var _this = this;
        this.setContentHeight()
            .then(function () {
            setTimeout(function () {
                _this.resetHeight();
            }, 400);
        });
    };
    CollapseComponent.prototype.activateCollapse = function () {
        var _this = this;
        this._isActive = true;
        setTimeout(function () { return _this.runCollapseOpen(); });
    };
    CollapseComponent.prototype.runCollapseClose = function () {
        var _this = this;
        this.collapseHeight = 0;
        setTimeout(function () {
            _this._isActive = false;
        }, 400);
    };
    CollapseComponent.prototype.deactivateCollapse = function () {
        var _this = this;
        this.setContentHeight()
            .then(function () {
            setTimeout(function () { return _this.runCollapseClose(); });
        });
    };
    CollapseComponent.prototype.setContentHeight = function () {
        this.collapseHeight = this.content.nativeElement.getBoundingClientRect().height + 'px';
        return Promise.resolve(this.collapseHeight);
    };
    CollapseComponent.decorators = [
        { type: Component, args: [{
                    selector: SELECTOR,
                    template: "\n    <div class=\"collapse\" [ngStyle]=\"{height: collapseHeight}\">\n      <div #content class=\"collapse__content\">\n        <div *ngIf=\"_isActive\">\n          <ng-content></ng-content>\n        </div>\n      </div>\n    </div>\n  ",
                    styles: ["\n    .collapse{overflow:hidden;transition:height 0.4s}\n  "]
                },] },
    ];
    /** @nocollapse */
    CollapseComponent.ctorParameters = function () { return []; };
    CollapseComponent.propDecorators = {
        "isActive": [{ type: Input },],
        "content": [{ type: ViewChild, args: ['content',] },],
    };
    return CollapseComponent;
}());
export { CollapseComponent };
//# sourceMappingURL=collapse.component.js.map