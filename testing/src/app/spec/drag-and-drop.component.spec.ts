import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DragAndDropComponent } from 'xynga-containers';
import { FileDropDirective } from 'ng2-file-upload';

describe('DragAndDropComponent', () => {
  let fixture: ComponentFixture<DragAndDropComponent>;
  let dad, dadComp;

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
  });

  it('should create a drag-and-drop element', () => {
    expect(dadComp).toBeTruthy();
  });

  it('should highlight when file is hovered over', async(() => {
    fixture.detectChanges();
    let onFileOverSpy = spyOn(dadComp, 'onFileOver');
    dad.triggerEventHandler('fileOver', true);

    fixture.whenStable().then( () => {
      expect(onFileOverSpy).toHaveBeenCalled();
      expect(dadComp.dropZoneHover).toBeTruthy();
    });
  }));
});

class FakeFileDrop {}
