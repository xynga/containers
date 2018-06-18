import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DragAndDropComponent } from '../drag-and-drop/drag-and-drop.component';
import { FileDropDirective } from 'ng2-file-upload';
import { By } from '@angular/platform-browser';

describe('DragAndDropComponent', () => {
  let fixture: ComponentFixture<DragAndDropComponent>;
  let dad: any;
  let dadComp: any;
  let fileDrop: any;

  beforeEach(async( () => {
    TestBed.configureTestingModule({
      declarations: [
        DragAndDropComponent,
        FileDropDirective
      ]
    }).compileComponents();
  }));

  beforeEach( () => {
    fixture = TestBed.createComponent(DragAndDropComponent);
    dad = fixture.debugElement;
    dadComp = dad.componentInstance;
    fileDrop = dad.query(By.directive(FileDropDirective));
  });

  it('should create a drag-and-drop element', () => {
    expect(dadComp).toBeTruthy();
  });

  it('should react when file is hovered over', () => {
    fixture.detectChanges();
    const onFileOverSpy = spyOn(dadComp, 'onFileOver').and.callThrough();
    fileDrop.triggerEventHandler('dragover', getFakeEventData());
    expect(onFileOverSpy).toHaveBeenCalled();
    expect(dadComp.dropZoneHover).toBeTruthy();
  });
});

function getFakeEventData(): any {
  return {
    dataTransfer: {
      files: [ 'foo.bar' ],
      types: [ 'Files' ]
    },
    preventDefault: () => undefined,
    stopPropagation: () => undefined
  };
}
