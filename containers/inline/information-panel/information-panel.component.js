import { Component, ViewChild, HostListener, Input } from '@angular/core';
// Externalized (polyglot) text values for field labels, input placeholders, button text
// screen reader text, page headings, user instructions, help messages, menu uploads, etc
var SELECTOR = 'information-panel';
var InformationPanelComponent = (function () {
    function InformationPanelComponent() {
        this.containerHeight = 0;
        this.active = false;
        this.isFixed = false;
        this.isFixedBottom = false;
    }
    Object.defineProperty(InformationPanelComponent.prototype, "title", {
        set: function (title) {
            this._title = title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InformationPanelComponent.prototype, "helpButtonLabel", {
        set: function (helpButtonLabel) {
            this._helpButtonLabel = helpButtonLabel;
        },
        enumerable: true,
        configurable: true
    });
    InformationPanelComponent.getOffsetRight = function (element) {
        var box = element.getBoundingClientRect();
        return document.documentElement.clientWidth - (box.left + window.pageXOffset - document.documentElement.clientLeft);
    };
    ;
    InformationPanelComponent.prototype.onResize = function () {
        this.positionPanel();
    };
    InformationPanelComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.positionPanel();
        // wait a tick to avoid one-time devMode unidirectional-data-flow-violation error
        // https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#parent-to-view-child
        setTimeout(function (_) { return _this.containerHeight = _this.getHeight(_this.container.nativeElement); });
    };
    InformationPanelComponent.prototype.toggle = function () {
        this.active = !this.active;
        //if (this.active) {
        //this.intercom.trackEvent('openHelpPanel');
        //}
    };
    InformationPanelComponent.prototype.onWaypointChange = function (event) {
        this.isFixed = event === 'down';
        this.positionPanel();
    };
    InformationPanelComponent.prototype.onWaypointChangeBottom = function (event) {
        this.isFixedBottom = event === 'down';
    };
    InformationPanelComponent.prototype.getHeight = function (element) {
        return Math.round(this.container.nativeElement.getBoundingClientRect().height) + 20;
    };
    InformationPanelComponent.prototype.positionPanel = function () {
        if (this.waypoint && this.isFixed) {
            this.offsetRight = InformationPanelComponent.getOffsetRight(this.waypoint.nativeElement) + 'px';
        }
        else {
            this.offsetRight = '';
        }
    };
    InformationPanelComponent.decorators = [
        { type: Component, args: [{
                    selector: SELECTOR,
                    template: "\n    <span #waypoint class=\"information-panel-waypoint-top\" waypoint [offset]=\"10\" (waypointChange)=\"onWaypointChange($event)\"></span>\n    <span class=\"information-panel-waypoint-bottom\" waypoint [offset]=\"containerHeight\" (waypointChange)=\"onWaypointChangeBottom($event)\"></span>\n    <div class=\"information-panel\" #container [class.active]=\"active\" [class.fixed]=\"isFixed\" [class.fixed-bottom]=\"isFixedBottom\" [ngStyle]=\"{right: offsetRight}\">\n      <div class=\"information-panel__viewport\">\n        <button class=\"link-btn information-panel__handle\" (click)=\"toggle()\">\n          <div class=\"information-panel__label\">\n            <icon icon=\"help\"></icon>\n            <span>\n              {{_helpButtonLabel}}\n            </span>\n          </div>\n          <div class=\"information-panel__arrow\">\n            <icon icon=\"chevron-left-green\"></icon>\n          </div>\n        </button>\n        <div class=\"information-panel__content\">\n          <h2>\n            {{_title}}\n          </h2>\n          <ng-content></ng-content>\n        </div>\n      </div>\n    </div>\n  ",
                    styles: ["\n    .panel{border:1px solid #d5d5d5}.panel--light{background-color:#d5d5d5}.panel--neutral{background-color:#d5d5d5}.information-panel-container{position:relative}.main .information-panel-container,.features .information-panel-container{margin-right:-32px}.information-panel-content{margin-right:90px}.information-panel{background:#f0efef;position:absolute;width:60px;top:0;right:0;z-index:999;transition:width 0.6s cubic-bezier(0.23, 1, 0.32, 1),box-shadow 0.4s;will-change:width;overflow:hidden}.information-panel__viewport{border:1px solid #d5d5d5;display:flex;align-items:stretch;transform:0.6s cubic-bezier(0.23, 1, 0.32, 1);width:350px}.information-panel.active,.information-panel:hover,.information-panel:active,.information-panel:focus{box-shadow:2px 2px 10px 0 rgba(0,0,0,0.3)}.information-panel.active{width:350px}.information-panel.active .information-panel__arrow{transform:rotate(180deg)}.information-panel.fixed{position:fixed;top:10px}.information-panel.fixed-bottom{position:absolute;bottom:10px;top:auto;right:0 !important}.information-panel__handle{padding:12px 18px;display:flex;flex-direction:column;justify-content:space-between;align-items:center;width:60px;border-right:1px solid #d5d5d5;border-top:none;border-bottom:none;border-left:none}.information-panel__handle:active,.information-panel__handle:focus{outline:none}.information-panel__label span{font-size:12px;margin-top:3px;display:block}.information-panel__arrow{transition:transform 0.4s}.information-panel__content{padding:32px}.information-panel__content h2{margin-top:-8px;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-weight:normal;transform:translateZ(0)}.information-panel__content ul{padding:0;margin-bottom:25px}.information-panel__content li{list-style-type:none;margin-bottom:15px;font-weight:bold}.information-panel-waypoint-top{position:absolute;top:0;right:0}.information-panel-waypoint-bottom{position:absolute;bottom:0;right:0}.link-btn,.link-btn:hover,.link-btn:focus,.link-btn:disabled{color:#266eb3;background:transparent;box-shadow:none;font-weight:bold}.link-btn:hover{text-decoration:underline}.link-btn:disabled{color:#d5d5d5}\n  "]
                },] },
    ];
    /** @nocollapse */
    InformationPanelComponent.ctorParameters = function () { return []; };
    InformationPanelComponent.propDecorators = {
        'title': [{ type: Input },],
        'helpButtonLabel': [{ type: Input },],
        'waypoint': [{ type: ViewChild, args: ['waypoint',] },],
        'container': [{ type: ViewChild, args: ['container',] },],
        'onResize': [{ type: HostListener, args: ['window:resize', ['$event'],] },],
    };
    return InformationPanelComponent;
}());
export { InformationPanelComponent };
//# sourceMappingURL=information-panel.component.js.map