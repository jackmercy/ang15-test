import { ChangeDetectorRef, Directive, ElementRef, OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  standalone: true,
  selector: '[matTooltip][appShowIfTruncated]',
})
export class ShowTooltipIfTruncatedDirective implements OnInit {
  constructor(private matTooltip: MatTooltip, private elementRef: ElementRef<HTMLElement>, private changeRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    // Wait for DOM update
    setTimeout(() => {
      const element = this.elementRef.nativeElement;
      this.matTooltip.disabled = element.scrollWidth <= element.clientWidth;
      this.changeRef.markForCheck();
    });
  }
}
