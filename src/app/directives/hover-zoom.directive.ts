import { Directive, signal } from '@angular/core';

@Directive({
  selector: 'img[appHoverZoom]',
  host: {
    class: 'transition-transform duration-200 hover:scale-200 cursor-zoom-in',
    '[style.transform-origin]': 'origin()',
    '(mousemove)': 'onMove($event)',
  },
})
export class HoverZoomDirective {
  origin = signal('50% 50%');

  onMove(e: MouseEvent) {
    const img = e.target as HTMLElement;
    const rect = img.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    this.origin.set(`${x}% ${y}%`);
  }
}