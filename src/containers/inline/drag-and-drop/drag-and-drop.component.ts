import {Component, Input, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';

const SELECTOR: string = 'drag-and-drop';

@Component({
    selector: SELECTOR,
    template: `
      <div class="uploadWindow" ng2FileDrop [ngClass]="{active: dropZoneHover}" (fileOver)="onFileOver($event)" [uploader]="fileUploader">
          <h3>Drag and Drop</h3>
          <div>
              <p>File Queue</p>
              <table>
                  <tr *ngFor="let item of fileUploader.queue">
                      <td>{{item?.file?.name}}</td>
                  </tr>
              </table>
          </div>

      </div>
    `,
    styles: [`
      .uploadWindow{margin-bottom:30px;border:2px dashed lightblue;height:320px;width:320px;overflow-y:auto;background-color:white;text-align:center;transition:border-color 0.2s}.active{border-color:cornflowerblue}
    `]
})
export class DragAndDropComponent implements OnInit{

    @Input() URL: string;
    public dropZoneHover: boolean = false;
    public fileUploader: FileUploader;

    ngOnInit() {
        this.fileUploader = new FileUploader({url: this.URL, removeAfterUpload: true});
    }

    public onFileOver(event: any): void {
        this.dropZoneHover = event;
    }
}