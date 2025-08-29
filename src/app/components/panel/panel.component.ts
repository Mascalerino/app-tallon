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
  @Input() showDifficultySelector: boolean = false;
  @Output() continue = new EventEmitter<string>();

  selectedDifficulty: string = 'facil';

  onContinue(): void {
    if (this.showDifficultySelector) {
      this.continue.emit(this.selectedDifficulty);
    } else {
      this.continue.emit();
    }
  }

  selectDifficulty(difficulty: string): void {
    this.selectedDifficulty = difficulty;
  }
}
