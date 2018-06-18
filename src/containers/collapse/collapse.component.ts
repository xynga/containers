import {Component, Input, ViewChild, OnInit} from '@angular/core';

const SELECTOR = 'collapse';

@Component({
  selector: SELECTOR,
  templateUrl: './collapse.html',
  styleUrls: ['./collapse.scss']
})
export class CollapseComponent implements OnInit {
  _isActive = false;
  collapseHeight: number | string = 0;

  @Input() set isActive(isActive: boolean) {
    if (isActive) {
      this.activateCollapse();
    } else {
      this.deactivateCollapse();
    }
  }

  @ViewChild('content') content: any;

  public ngOnInit(): void {
    if (this._isActive) {
      this.resetHeight();
    }
  }

  resetHeight(): void {
    this.collapseHeight = 0;
  }

  runCollapseOpen(): void {
    this.setContentHeight();
  }

  activateCollapse(): void {
    this._isActive = true;
    setTimeout(() => this.runCollapseOpen());
  }

  runCollapseClose(): void {
    this.collapseHeight = 0;
    setTimeout(() => {
      this._isActive = false;
    }, 400);
  }

  deactivateCollapse(): void {
    this.setContentHeight()
        .then(() => {
          setTimeout(() => this.runCollapseClose());
        });
  }

  setContentHeight(): Promise<number | string> {
    this.collapseHeight = this.content.nativeElement.getBoundingClientRect().height + 'px';
    return Promise.resolve(this.collapseHeight);
  }
}
