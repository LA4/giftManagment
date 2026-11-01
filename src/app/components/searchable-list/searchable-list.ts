import { Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-searchable-list',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
  ],
  styleUrl: './searchable-list.scss',
  templateUrl: './searchable-list.html',
})
export class SearchableList {
  readonly items = input<string[]>([]);
  readonly placeholder = input('Rechercher...');
  readonly emptyMessage = input('Aucun résultat');

  protected readonly search = signal('');

  protected readonly filteredItems = computed(() => {
    const term = this.normalize(this.search());
    if (!term) return this.items();
    return this.items().filter((item) => this.normalize(item).includes(term));
  });

  // Ignore la casse et les accents
  private normalize(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .trim();
  }
}
