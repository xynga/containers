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
const Tether = require("tether");
const tooltipSpeed = 250;
const easeOutQuart = 'cubic-bezier(0.165, 0.840, 0.440, 1.000)';
const opacityOff = animations_1.style({
    opacity: 0
});
const opacityOn = animations_1.style({
    opacity: 1
});
const SELECTOR = 'tooltip';
let TooltipComponent = class TooltipComponent {
    constructor(zone) {
        this.zone = zone;
        this.cssClass = '';
        this.first = false;
        this.last = false;
        this.attachment = 'top left';
        this.targetAttachment = 'top right';
        this.onTooltipToggle = new core_1.EventEmitter();
        this.onTooltipNavigate = new core_1.EventEmitter();
        this.tooltipState = 'inactive';
        this.active = false;
        this.isTutoring = false;
    }
    setupTooltip(target, attachment, targetAttachment) {
        this.target = target;
        this.attachment = attachment;
        this.targetAttachment = targetAttachment;
        this.initTooltip();
    }
    destroyTooltip() {
        if (this.tether) {
            this.active = false;
            this.tether.destroy();
        }
        Array.prototype.forEach.call(document.querySelectorAll('body>.macro-tooltip'), (el) => el.parentNode.removeChild(el));
    }
    clearTimeouts() {
        if (this.disableTimeout) {
            clearTimeout(this.disableTimeout);
        }
        if (this.enableTimeout) {
            clearTimeout(this.enableTimeout);
        }
    }
    toggle() {
        this.active ? this.hide() : this.show();
    }
    hide() {
        if (this.active) {
            this.tooltipState = 'inactive';
            this.onTooltipToggle.emit(false);
            this.disableTimeout = setTimeout(() => this.active = false, tooltipSpeed);
        }
    }
    show() {
        if (!this.active) {
            this.tooltipState = 'active';
            this.active = true;
            this.onTooltipToggle.emit(true);
            this.zone.runOutsideAngular(() => this.enableTimeout = setTimeout(() => this.tether.position()));
        }
    }
    initTooltip() {
        this.zone.runOutsideAngular(() => {
            this.tether = new Tether({
                element: this.container.nativeElement,
                target: this.target,
                attachment: this.attachment,
                targetAttachment: this.targetAttachment,
                constraints: [
                    {
                        to: 'window',
                        attachment: 'together'
                    }
                ]
            });
        });
    }
    ngOnDestroy() {
        this.destroyTooltip();
        //super.ngOnDestroy();
    }
};
__decorate([
    core_1.ViewChild('container'),
    __metadata("design:type", Object)
], TooltipComponent.prototype, "container", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TooltipComponent.prototype, "cssClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], TooltipComponent.prototype, "tutorialIndex", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], TooltipComponent.prototype, "first", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], TooltipComponent.prototype, "last", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TooltipComponent.prototype, "attachment", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TooltipComponent.prototype, "targetAttachment", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TooltipComponent.prototype, "onTooltipToggle", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TooltipComponent.prototype, "onTooltipNavigate", void 0);
TooltipComponent = __decorate([
    core_1.Component({
        selector: SELECTOR,
        templateUrl: './tooltip.html',
        animations: [
            animations_1.trigger('tooltipState', [
                animations_1.state('inactive, expanded', opacityOff),
                animations_1.state('active', opacityOn),
                animations_1.transition('* => active', animations_1.animate(`${tooltipSpeed}ms ${easeOutQuart}`)),
                animations_1.transition('* => inactive', animations_1.animate(`${tooltipSpeed}ms ${easeOutQuart}`))
            ])
        ],
        styleUrls: ['./tooltip.scss']
    }),
    __metadata("design:paramtypes", [core_1.NgZone])
], TooltipComponent);
exports.TooltipComponent = TooltipComponent;
