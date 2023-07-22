import {
  AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit, Renderer2, Optional, OnDestroy
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[totalValue]'
})
export class TotalDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input() appInputMaxLength!: number;
  private div!: HTMLDivElement;
  private destroyed$: any = new Subject();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Optional() public ngModel: NgModel,
  ) { }

  @HostListener('input', ['$event']) onChange(event: any) {
    if (!this.ngModel) {
      this.update(event.target.value);
    }
  }

  ngOnInit() {
    this.renderer.setAttribute(this.el.nativeElement, 'max', this.appInputMaxLength.toString());
    if (this.ngModel) {
      this.ngModel.valueChanges?.pipe(takeUntil(this.destroyed$)).subscribe(value => {
        this.update(value);
      })
    }
  }

  ngAfterViewInit() {
    this.div = this.renderer.createElement('span');
    this.div.classList.add('count');
    this.renderer.insertBefore(this.el.nativeElement.parentNode, this.div, this.el.nativeElement.nextSibling);
    this.update(this.el.nativeElement.value);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
    if (this.div) {
      this.div.remove();
    }
  }

  private update(length: number) {
    // this.renderer.setProperty(this.div, 'innerText', `${length}/${this.appInputMaxLength}`);
  }
}
