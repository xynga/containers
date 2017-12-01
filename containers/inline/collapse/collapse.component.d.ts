import { OnInit } from '@angular/core';
export declare class CollapseComponent implements OnInit {
    _isActive: boolean;
    collapseHeight: number | string;
    isActive: boolean;
    content: any;
    ngOnInit(): void;
    resetHeight(): void;
    runCollapseOpen(): void;
    activateCollapse(): void;
    runCollapseClose(): void;
    deactivateCollapse(): void;
    setContentHeight(): Promise<number | string>;
}
