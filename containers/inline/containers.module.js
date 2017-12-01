import { NgModule } from "@angular/core";
import { CardComponent } from "./card/card.component";
import { CollapseComponent } from "./collapse/collapse.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { InformationPanelComponent } from "./information-panel/information-panel.component";
import { WaypointDirective } from "./information-panel/directives/waypoints.directive";
import { TooltipComponent } from "./tooltip/tooltip.component";
import { TooltipTargetDirective } from "./tooltip/directives/tooltip-target.directive";
import { GeneralModule } from "xynga-general/general/inline";
import { CommonModule } from "@angular/common";
import { ModalPanelComponent } from "./modal-panel/modal-panel.component";
import { DragAndDropComponent } from "./drag-and-drop/drag-and-drop.component";
import { BodyDirective } from "./modal-panel/directives/body.directive";
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { FileUploadModule } from "ng2-file-upload";
var ContainersModule = (function () {
    function ContainersModule() {
    }
    ContainersModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        ModalPanelComponent,
                        CardComponent,
                        CollapseComponent,
                        InformationPanelComponent,
                        WaypointDirective,
                        TooltipComponent,
                        TooltipTargetDirective,
                        BodyDirective,
                        DragAndDropComponent
                    ],
                    providers: [
                        BodyDirective
                    ],
                    imports: [
                        CommonModule,
                        BrowserAnimationsModule,
                        GeneralModule,
                        RouterModule,
                        HttpModule,
                        FileUploadModule
                    ],
                    exports: [
                        ModalPanelComponent,
                        CardComponent,
                        CollapseComponent,
                        InformationPanelComponent,
                        TooltipComponent,
                        WaypointDirective,
                        TooltipComponent,
                        TooltipTargetDirective,
                        BodyDirective,
                        DragAndDropComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    ContainersModule.ctorParameters = function () { return []; };
    return ContainersModule;
}());
export { ContainersModule };
//# sourceMappingURL=containers.module.js.map