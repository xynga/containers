import {NgModule} from "@angular/core";
import {CardComponent} from "./card/card.component";
import {CollapseComponent} from "./collapse/collapse.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {InformationPanelComponent} from "./information-panel/information-panel.component";
import {WaypointDirective} from "./information-panel/directives/waypoints.directive";
import {TooltipComponent} from "./tooltip/tooltip.component";
import {TooltipTargetDirective} from "./tooltip/directives/tooltip-target.directive";
import {GeneralModule} from "../xynga-general/general.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    CardComponent,
    CollapseComponent,
    InformationPanelComponent,
    WaypointDirective,
    TooltipComponent,
    TooltipTargetDirective
  ],
  imports:[
    CommonModule,
    BrowserAnimationsModule,
    GeneralModule,
  ],
  exports:[
    CardComponent,
    CollapseComponent,
    InformationPanelComponent,
    TooltipComponent,
    WaypointDirective,
    TooltipComponent,
    TooltipTargetDirective
  ]
})

export class ContainersModule {}
