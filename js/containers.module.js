"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const card_component_1 = require("./card/card.component");
const collapse_component_1 = require("./collapse/collapse.component");
const animations_1 = require("@angular/platform-browser/animations");
const information_panel_component_1 = require("./information-panel/information-panel.component");
const waypoints_directive_1 = require("./information-panel/directives/waypoints.directive");
const tooltip_component_1 = require("./tooltip/tooltip.component");
const tooltip_target_directive_1 = require("./tooltip/directives/tooltip-target.directive");
const general_module_1 = require("xynga-general/general.module");
const common_1 = require("@angular/common");
const modal_panel_component_1 = require("./modal-panel/modal-panel.component");
const drag_and_drop_component_1 = require("./drag-and-drop/drag-and-drop.component");
const body_directive_1 = require("./modal-panel/directives/body.directive");
const router_1 = require("@angular/router");
const http_1 = require("@angular/http");
const ng2_file_upload_1 = require("ng2-file-upload");
let ContainersModule = class ContainersModule {
};
ContainersModule = __decorate([
    core_1.NgModule({
        declarations: [
            modal_panel_component_1.ModalPanelComponent,
            card_component_1.CardComponent,
            collapse_component_1.CollapseComponent,
            information_panel_component_1.InformationPanelComponent,
            waypoints_directive_1.WaypointDirective,
            tooltip_component_1.TooltipComponent,
            tooltip_target_directive_1.TooltipTargetDirective,
            body_directive_1.BodyDirective,
            drag_and_drop_component_1.DragAndDropComponent
        ],
        providers: [
            body_directive_1.BodyDirective
        ],
        imports: [
            common_1.CommonModule,
            animations_1.BrowserAnimationsModule,
            general_module_1.GeneralModule,
            router_1.RouterModule,
            http_1.HttpModule,
            ng2_file_upload_1.FileUploadModule
        ],
        exports: [
            modal_panel_component_1.ModalPanelComponent,
            card_component_1.CardComponent,
            collapse_component_1.CollapseComponent,
            information_panel_component_1.InformationPanelComponent,
            tooltip_component_1.TooltipComponent,
            waypoints_directive_1.WaypointDirective,
            tooltip_component_1.TooltipComponent,
            tooltip_target_directive_1.TooltipTargetDirective,
            body_directive_1.BodyDirective,
            drag_and_drop_component_1.DragAndDropComponent
        ]
    })
], ContainersModule);
exports.ContainersModule = ContainersModule;
