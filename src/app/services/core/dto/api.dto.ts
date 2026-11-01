import { HttpParams } from '@angular/common/http';

export type ApiParams =
  | HttpParams
  | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;

export interface ApiRequestOptions {
  /** Headers ajoutés à ceux du service (ils les surchargent en cas de doublon). */
  headers?: Record<string, string>;
  params?: ApiParams;
}
