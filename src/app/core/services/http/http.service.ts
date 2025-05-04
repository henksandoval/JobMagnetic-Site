import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly http = inject(HttpClient);

  get<TOut>(url: URL, params?: HttpParams): Observable<TOut>;
  get<TOut>(url: string, params?: HttpParams): Observable<TOut>;
  get<TOut>(url: URL | string, params?: HttpParams): Observable<TOut> {
    return this.http.get<TOut>(this.parseUrl(url), { params });
  }

  post<TIn, TOut>(url: URL, body: TIn, options?: { headers?: HttpHeaders }): Observable<TOut>;
  post<TIn, TOut>(url: string, body: TIn, options?: { headers?: HttpHeaders }): Observable<TOut>;
  post<TIn, TOut>(url: URL | string, body: TIn, options?: { headers?: HttpHeaders }): Observable<TOut> {
    return this.http.post<TOut>(this.parseUrl(url), body, options);
  }

  put<TIn, TOut>(url: URL, body: TIn, options?: { headers?: HttpHeaders }): Observable<TOut>;
  put<TIn, TOut>(url: string, body: TIn, options?: { headers?: HttpHeaders }): Observable<TOut>;
  put<TIn, TOut>(url: URL | string, body: TIn, options?: { headers?: HttpHeaders }): Observable<TOut> {
    return this.http.put<TOut>(this.parseUrl(url), body, options);
  }

  patch<TIn, TOut>(url: URL, body: TIn, options?: { headers?: HttpHeaders }): Observable<TOut>;
  patch<TIn, TOut>(url: string, body: TIn, options?: { headers?: HttpHeaders }): Observable<TOut>;
  patch<TIn, TOut>(url: URL | string, body: TIn, options?: { headers?: HttpHeaders }): Observable<TOut> {
    return this.http.patch<TOut>(this.parseUrl(url), body, options);
  }

  delete<TOut>(url: URL, options?: { headers?: HttpHeaders }): Observable<TOut>;
  delete<TOut>(url: string, options?: { headers?: HttpHeaders }): Observable<TOut>;
  delete<TOut>(url: URL | string, options?: { headers?: HttpHeaders }): Observable<TOut> {
    return this.http.delete<TOut>(this.parseUrl(url), options);
  }

  private parseUrl(url: string | URL): string {
    return url instanceof URL ? url.toString() : url;
  }
}
