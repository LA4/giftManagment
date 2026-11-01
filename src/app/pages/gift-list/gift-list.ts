import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface Gift {
  id: number;
  name: string;
  obtained: boolean;
}

@Component({
  selector: 'app-gift-list',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule,
  ],
  styleUrl: './gift-list.scss',
  templateUrl: './gift-list.html',
})
export class GiftList {
  private nextId = 1;

  protected readonly gifts = signal<Gift[]>([]);
  protected newGift = '';

  protected readonly obtainedCount = computed(
    () => this.gifts().filter((g) => g.obtained).length,
  );

  protected add(): void {
    const name = this.newGift.trim();
    if (!name) return;
    this.gifts.update((list) => [...list, { id: this.nextId++, name, obtained: false }]);
    this.newGift = '';
  }

  protected toggle(id: number): void {
    this.gifts.update((list) =>
      list.map((g) => (g.id === id ? { ...g, obtained: !g.obtained } : g)),
    );
  }

  protected remove(id: number): void {
    this.gifts.update((list) => list.filter((g) => g.id !== id));
  }
}
