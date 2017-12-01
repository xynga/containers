import { Component, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
var SELECTOR = 'drag-and-drop';
var DragAndDropComponent = (function () {
    function DragAndDropComponent() {
        this.dropZoneHover = false;
    }
    DragAndDropComponent.prototype.ngOnInit = function () {
        this.fileUploader = new FileUploader({ url: this.URL, removeAfterUpload: true });
    };
    DragAndDropComponent.prototype.onFileOver = function (event) {
        this.dropZoneHover = event;
    };
    DragAndDropComponent.decorators = [
        { type: Component, args: [{
                    selector: SELECTOR,
                    template: "\n      <div class=\"uploadWindow\" ng2FileDrop [ngClass]=\"{active: dropZoneHover}\" (fileOver)=\"onFileOver($event)\" [uploader]=\"fileUploader\">\n          <h3>Drag and Drop</h3>\n          <div>\n              <p>File Queue</p>\n              <table>\n                  <tr *ngFor=\"let item of fileUploader.queue\">\n                      <td>{{item?.file?.name}}</td>\n                  </tr>\n              </table>\n          </div>\n\n      </div>\n    ",
                    styles: ["\n      .uploadWindow{margin-bottom:30px;border:2px dashed lightblue;height:320px;width:320px;overflow-y:auto;background-color:white;text-align:center;transition:border-color 0.2s}.active{border-color:cornflowerblue}\n    "]
                },] },
    ];
    /** @nocollapse */
    DragAndDropComponent.ctorParameters = function () { return []; };
    DragAndDropComponent.propDecorators = {
        'URL': [{ type: Input },],
    };
    return DragAndDropComponent;
}());
export { DragAndDropComponent };
//# sourceMappingURL=drag-and-drop.component.js.map