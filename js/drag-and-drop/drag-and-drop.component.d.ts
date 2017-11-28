import { OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
export declare class DragAndDropComponent implements OnInit {
    URL: string;
    dropZoneHover: boolean;
    fileUploader: FileUploader;
    ngOnInit(): void;
    onFileOver(event: any): void;
}
