import {Component, Input, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';

const SELECTOR: string = 'drag-and-drop';

@Component({
    selector: SELECTOR,
    templateUrl: './drag-and-drop.component.html',
    styleUrls: ['./drag-and-drop.component.css']
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