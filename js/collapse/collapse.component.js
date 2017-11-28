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
const SELECTOR = 'collapse';
let CollapseComponent = class CollapseComponent {
    constructor() {
        this._isActive = false;
        this.collapseHeight = 0;
    }
    set isActive(isActive) {
        if (isActive) {
            this.activateCollapse();
        }
        else {
            this.deactivateCollapse();
        }
    }
    ngOnInit() {
        if (this._isActive) {
            this.resetHeight();
        }
    }
    resetHeight() {
        this.collapseHeight = 0;
    }
    runCollapseOpen() {
        this.setContentHeight()
            .then(() => {
            setTimeout(() => {
                this.resetHeight();
            }, 400);
        });
    }
    activateCollapse() {
        this._isActive = true;
        setTimeout(() => this.runCollapseOpen());
    }
    runCollapseClose() {
        this.collapseHeight = 0;
        setTimeout(() => {
            this._isActive = false;
        }, 400);
    }
    deactivateCollapse() {
        this.setContentHeight()
            .then(() => {
            setTimeout(() => this.runCollapseClose());
        });
    }
    setContentHeight() {
        this.collapseHeight = this.content.nativeElement.getBoundingClientRect().height + 'px';
        return Promise.resolve(this.collapseHeight);
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], CollapseComponent.prototype, "isActive", null);
__decorate([
    core_1.ViewChild('content'),
    __metadata("design:type", Object)
], CollapseComponent.prototype, "content", void 0);
CollapseComponent = __decorate([
    core_1.Component({
        selector: SELECTOR,
        templateUrl: './collapse.html',
        styleUrls: ['./collapse.scss']
    })
], CollapseComponent);
exports.CollapseComponent = CollapseComponent;
