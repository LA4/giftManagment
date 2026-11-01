import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiParams, ApiRequestOptions } from '../dto/api.dto';

/**
 * Service de base pour les appels API.
 *
 * L'URL de l'API vient de `environment.apiUrl`. Chaque service enfant
 * indique seulement son `endpoint` (et éventuellement ses `headers`) :
 *
 * ```ts
 * @Injectable({ providedIn: 'root' })
 * export class GiftService extends AbstractApiService {
 *   protected override readonly endpoint = '/gifts';
 *
 *   getAll() { return this.get<Gift[]>(); }
 *   getOne(id: number) { return this.get<Gift>(`/${id}`); }
 * }
 * ```
 */
export abstract class AbstractApiService {
  protected readonly http = inject(HttpClient);

  /** URL de l'API, définie une seule fois dans les fichiers d'environnement. */
  protected readonly baseUrl: string = environment.apiUrl;

  /** Chemin de la ressource, ajouté à `baseUrl` (ex. `/gifts`). */
  protected readonly endpoint: string = '';

  /** Headers envoyés avec chaque requête. À surcharger (ex. token d'authentification). */
  protected get headers(): Record<string, string> {
    return { 'Content-Type': 'application/json' };
  }

  protected get<T>(path = '', options?: ApiRequestOptions): Observable<T> {
    return this.http.get<T>(this.url(path), this.buildOptions(options));
  }

  protected post<T>(path = '', body: unknown = null, options?: ApiRequestOptions): Observable<T> {
    return this.http.post<T>(this.url(path), body, this.buildOptions(options));
  }

  protected put<T>(path = '', body: unknown = null, options?: ApiRequestOptions): Observable<T> {
    return this.http.put<T>(this.url(path), body, this.buildOptions(options));
  }

  protected patch<T>(path = '', body: unknown = null, options?: ApiRequestOptions): Observable<T> {
    return this.http.patch<T>(this.url(path), body, this.buildOptions(options));
  }

  protected delete<T>(path = '', options?: ApiRequestOptions): Observable<T> {
    return this.http.delete<T>(this.url(path), this.buildOptions(options));
  }

  private url(path: string): string {
    return [this.baseUrl, this.endpoint, path]
      .map((part, i) => (i === 0 ? part.replace(/\/+$/, '') : part.replace(/^\/+|\/+$/g, '')))
      .filter(Boolean)
      .join('/');
  }

  private buildOptions(options?: ApiRequestOptions): { headers: HttpHeaders; params?: ApiParams } {
    return {
      headers: new HttpHeaders({ ...this.headers, ...options?.headers }),
      params: options?.params,
    };
  }
}
