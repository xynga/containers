import {Directive, HostBinding} from '@angular/core';

const SELECTOR = 'body';

@Directive({
  selector: SELECTOR
})
export class BodyDirective {
  @HostBinding('class.has-modal') public modalOpen = false;
}
