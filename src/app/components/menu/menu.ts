import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/core/api/auth';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule],
  styleUrl: './menu.scss',
  templateUrl: './menu.html',
})
export class Menu {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly isAuthenticated = this.authService.isAuthenticated;

  protected readonly links = computed(() => [
    { label: 'Accueil', path: '/', icon: 'home' },
    { label: 'Ma liste de cadeaux', path: '/ma-liste', icon: 'card_giftcard' },
    ...(this.isAuthenticated() ? [] : [{ label: 'Connexion', path: '/auth', icon: 'login' }]),
  ]);

  protected logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
