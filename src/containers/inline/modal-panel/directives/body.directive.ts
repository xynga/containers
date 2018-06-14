import {Directive, HostBinding} from '@angular/core';

const SELECTOR: string = 'body';

@Directive({
  selector: SELECTOR
})
export class BodyDirective {
  @HostBinding('class.has-modal') public modalOpen: boolean = false;
}
