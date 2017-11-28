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
const tooltip_component_1 = require("../tooltip.component");
const SELECTOR = '[tooltipTarget]';
let TooltipTargetDirective = class TooltipTargetDirective {
    constructor(element) {
        this.element = element;
        this.targetAttachment = 'top right';
        this.attachment = 'top left';
        this.onTooltipToggle = new core_1.EventEmitter();
    }
    ngOnInit() {
        if (this.tooltipTarget) {
            this.tooltipTarget.setupTooltip(this.element.nativeElement, this.attachment, this.targetAttachment);
            this.toggleSubscription = this.tooltipTarget.onTooltipToggle.subscribe((toggle) => this.onTooltipToggle.emit(toggle));
        }
    }
    ngOnDestroy() {
        if (this.toggleSubscription) {
            this.toggleSubscription.unsubscribe();
        }
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", tooltip_component_1.TooltipComponent)
], TooltipTargetDirective.prototype, "tooltipTarget", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TooltipTargetDirective.prototype, "targetAttachment", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TooltipTargetDirective.prototype, "attachment", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TooltipTargetDirective.prototype, "onTooltipToggle", void 0);
TooltipTargetDirective = __decorate([
    core_1.Directive({
        selector: SELECTOR
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], TooltipTargetDirective);
exports.TooltipTargetDirective = TooltipTargetDirective;
