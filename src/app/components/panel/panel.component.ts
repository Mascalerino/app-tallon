import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent {
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() text2: string = '';
  @Input() isVisible: boolean = true;
  @Output() continue = new EventEmitter<void>();

  onContinue(): void {
    this.continue.emit();
  }
}
