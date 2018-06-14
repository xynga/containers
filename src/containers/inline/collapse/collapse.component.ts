import {Component, Input, ViewChild, OnInit} from '@angular/core';

const SELECTOR: string = 'collapse';

@Component({
  selector: SELECTOR,
  template: `
    <div class="collapse" [ngStyle]="{height: collapseHeight}">
      <div #content class="collapse__content">
        <div *ngIf="_isActive">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .collapse{overflow:hidden;transition:height 0.4s}
  `]
})
export class CollapseComponent implements OnInit {
  _isActive: boolean = false;
  collapseHeight: number | string = 0;

  @Input() set isActive(isActive: boolean) {
    if (isActive) {
      this.activateCollapse();
    }
    else {
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
