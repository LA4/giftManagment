import { Injectable, computed, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AbstractApiService } from './abstract';
import { AuthResponse, AuthUser, Credentials, RegisterPayload } from '../dto/auth.dto';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService extends AbstractApiService {
  protected override readonly endpoint = '/auth';

  private readonly _token = signal<string | null>(this.read(TOKEN_KEY));
  private readonly _user = signal<AuthUser | null>(this.readJson<AuthUser>(USER_KEY));

  readonly token = this._token.asReadonly();
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => !!this._token());

  /** Ajoute le token aux headers de toutes les requêtes de ce service. */
  protected override get headers(): Record<string, string> {
    const token = this._token();
    return token
      ? { ...super.headers, Authorization: `Bearer ${token}` }
      : super.headers;
  }

  login(credentials: Credentials): Observable<AuthResponse> {
    return this.post<AuthResponse>('/login', credentials).pipe(
      tap((res) => this.setSession(res)),
    );
  }

  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.post<AuthResponse>('/register', payload).pipe(
      tap((res) => this.setSession(res)),
    );
  }

  logout(): void {
    this._token.set(null);
    this._user.set(null);
    this.remove(TOKEN_KEY);
    this.remove(USER_KEY);
  }

  private setSession({ token, user }: AuthResponse): void {
    this._token.set(token);
    this._user.set(user);
    this.write(TOKEN_KEY, token);
    this.write(USER_KEY, JSON.stringify(user));
  }

  // localStorage peut être indisponible (navigation privée, SSR) : on ignore les erreurs
  private read(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private readJson<T>(key: string): T | null {
    try {
      const raw = this.read(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }

  private write(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* ignoré */
    }
  }

  private remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignoré */
    }
  }
}
