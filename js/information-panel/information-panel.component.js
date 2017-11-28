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
// Externalized (polyglot) text values for field labels, input placeholders, button text
// screen reader text, page headings, user instructions, help messages, menu uploads, etc
const SELECTOR = 'information-panel';
let InformationPanelComponent = InformationPanelComponent_1 = class InformationPanelComponent {
    constructor() {
        this.containerHeight = 0;
        this.active = false;
        this.isFixed = false;
        this.isFixedBottom = false;
    }
    set title(title) {
        this._title = title;
    }
    set helpButtonLabel(helpButtonLabel) {
        this._helpButtonLabel = helpButtonLabel;
    }
    static getOffsetRight(element) {
        const box = element.getBoundingClientRect();
        return document.documentElement.clientWidth - (box.left + window.pageXOffset - document.documentElement.clientLeft);
    }
    ;
    onResize() {
        this.positionPanel();
    }
    ngAfterViewInit() {
        this.positionPanel();
        // wait a tick to avoid one-time devMode unidirectional-data-flow-violation error
        // https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#parent-to-view-child
        setTimeout((_) => this.containerHeight = this.getHeight(this.container.nativeElement));
    }
    toggle() {
        this.active = !this.active;
        //if (this.active) {
        //this.intercom.trackEvent('openHelpPanel');
        //}
    }
    onWaypointChange(event) {
        this.isFixed = event === 'down';
        this.positionPanel();
    }
    onWaypointChangeBottom(event) {
        this.isFixedBottom = event === 'down';
    }
    getHeight(element) {
        return Math.round(this.container.nativeElement.getBoundingClientRect().height) + 20;
    }
    positionPanel() {
        if (this.waypoint && this.isFixed) {
            this.offsetRight = InformationPanelComponent_1.getOffsetRight(this.waypoint.nativeElement) + 'px';
        }
        else {
            this.offsetRight = '';
        }
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], InformationPanelComponent.prototype, "title", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], InformationPanelComponent.prototype, "helpButtonLabel", null);
__decorate([
    core_1.ViewChild('waypoint'),
    __metadata("design:type", core_1.ElementRef)
], InformationPanelComponent.prototype, "waypoint", void 0);
__decorate([
    core_1.ViewChild('container'),
    __metadata("design:type", core_1.ElementRef)
], InformationPanelComponent.prototype, "container", void 0);
__decorate([
    core_1.HostListener('window:resize', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InformationPanelComponent.prototype, "onResize", null);
InformationPanelComponent = InformationPanelComponent_1 = __decorate([
    core_1.Component({
        selector: SELECTOR,
        templateUrl: './information-panel.html',
        styleUrls: ['./information-panel.scss']
    }),
    __metadata("design:paramtypes", [])
], InformationPanelComponent);
exports.InformationPanelComponent = InformationPanelComponent;
var InformationPanelComponent_1;
