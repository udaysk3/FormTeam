import { Directive,ElementRef,Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDemo]'
})
export class DemoDirective {
  demo = 'sample';
  constructor(ele :ElementRef, renderer : Renderer2) {
    let demo = renderer.createText('demo');
    renderer.appendChild(ele.nativeElement, demo);
  }
}
