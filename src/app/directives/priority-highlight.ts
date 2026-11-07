import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPriorityHighlight]',
  standalone: true
})
export class PriorityHighlightDirective implements OnInit {
  @Input() appPriorityHighlight: string = 'Low';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Highlight high and medium priority tasks visually
    if (this.appPriorityHighlight === 'High') {
      this.renderer.setStyle(this.el.nativeElement, 'border-left', '5px solid #dc3545');
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#fff5f5');
    } else if (this.appPriorityHighlight === 'Medium') {
      this.renderer.setStyle(this.el.nativeElement, 'border-left', '5px solid #ffc107');
    }
  }
}