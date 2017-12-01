import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import 'waypoints/lib/noframework.waypoints.js';
var SELECTOR = '[waypoint]';
var WaypointDirective = (function () {
    function WaypointDirective(element) {
        this.element = element;
        this.horizontal = false;
        this.waypointChange = new EventEmitter();
    }
    WaypointDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.setWaypoint(); }, 250);
    };
    WaypointDirective.prototype.setWaypoint = function () {
        var _this = this;
        var config = {
            element: this.element.nativeElement,
            handler: function (direction) { return _this.waypointChange.emit(direction); }
        };
        if (this.offset) {
            config.offset = this.offset;
        }
        if (this.context) {
            config.context = this.context;
        }
        if (this.horizontal) {
            config.horizontal = this.horizontal;
        }
        this.waypoint = new Waypoint(config);
    };
    WaypointDirective.prototype.ngOnDestroy = function () {
        if (this.waypoint) {
            this.waypoint.destroy();
        }
    };
    WaypointDirective.decorators = [
        { type: Directive, args: [{
                    selector: SELECTOR
                },] },
    ];
    /** @nocollapse */
    WaypointDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    WaypointDirective.propDecorators = {
        "context": [{ type: Input },],
        "offset": [{ type: Input },],
        "horizontal": [{ type: Input },],
        "waypointChange": [{ type: Output },],
    };
    return WaypointDirective;
}());
export { WaypointDirective };
//# sourceMappingURL=waypoints.directive.js.map