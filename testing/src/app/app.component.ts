import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  firstTooltipActive = false;
  secondTooltipActive = false;
  thirdTooltipActive = false;
  fourthTooltipActive = false;

  toggleBox = false;

  title = 'Sample Title';
  message = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent rutrum non turpis commodo rutrum. Nullam
  faucibus ante ut nisi dictum, quis pulvinar nisi faucibus. Vestibulum id faucibus nisl. Donec ornare at metus in
  tristique. Pellentesque ipsum quam, commodo vel odio non, vulputate laoreet augue. Mauris rhoncus augue enim, a
  vestibulum nisl porttitor non. Suspendisse potenti. Nullam quam velit, pellentesque id hendrerit id, auctor nec
  leo. Ut tempor magna at quam malesuada tempor.`;

  closeAllTooltips() {
    this.firstTooltipActive = false;
    this.secondTooltipActive = false;
    this.thirdTooltipActive = false;
    this.fourthTooltipActive = false;
  }
}
