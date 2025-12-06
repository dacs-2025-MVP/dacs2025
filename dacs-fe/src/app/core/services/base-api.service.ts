import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, retry, timeout, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS, HTTP_HEADERS, HTTP_TIMEOUTS } from '../constants/api-endpoints';
import { IApiResponse, IApiError, ISearchFilters } from '../models/api-response';
import { APP_MESSAGES } from '../constants/app-constants';

/**
 * Servicio base para operaciones HTTP
 */
@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  protected readonly baseUrl: string;
  protected readonly defaultHeaders: HttpHeaders;

  constructor(protected http: HttpClient) {
    // Asegurar que la URL base sea absoluta o relativa
    this.baseUrl = (environment.backendForFrontendUrl.startsWith('http') || environment.backendForFrontendUrl.startsWith('/'))
      ? environment.backendForFrontendUrl 
      : `http://${environment.backendForFrontendUrl}`;
    
    this.defaultHeaders = new HttpHeaders({
      [HTTP_HEADERS.CONTENT_TYPE]: HTTP_HEADERS.APPLICATION_JSON,
      [HTTP_HEADERS.ACCEPT]: HTTP_HEADERS.APPLICATION_JSON
    });
  }

  /**
   * Realiza una petición GET
   */
  protected get<T>(endpoint: string, params?: any, customTimeout?: number): Observable<T> {
    const url = this.buildUrl(endpoint);
    const httpParams = this.buildParams(params);
    const timeoutValue = customTimeout || HTTP_TIMEOUTS.DEFAULT;

    return this.http.get<T>(url, {
      headers: this.defaultHeaders,
      params: httpParams
    }).pipe(
      timeout(timeoutValue),
      retry(2),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Realiza una petición POST
   */
  protected post<T>(endpoint: string, data: any, customTimeout?: number): Observable<T> {
    const url = this.buildUrl(endpoint);
    const timeoutValue = customTimeout || HTTP_TIMEOUTS.DEFAULT;

    return this.http.post<T>(url, data, {
      headers: this.defaultHeaders
    }).pipe(
      timeout(timeoutValue),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Realiza una petición PUT
   */
  protected put<T>(endpoint: string, data: any, customTimeout?: number): Observable<T> {
    const url = this.buildUrl(endpoint);
    const timeoutValue = customTimeout || HTTP_TIMEOUTS.DEFAULT;

    return this.http.put<T>(url, data, {
      headers: this.defaultHeaders
    }).pipe(
      timeout(timeoutValue),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Realiza una petición DELETE
   */
  protected delete<T>(endpoint: string, customTimeout?: number): Observable<T> {
    const url = this.buildUrl(endpoint);
    const timeoutValue = customTimeout || HTTP_TIMEOUTS.DEFAULT;

    return this.http.delete<T>(url, {
      headers: this.defaultHeaders
    }).pipe(
      timeout(timeoutValue),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Realiza una petición PATCH
   */
  protected patch<T>(endpoint: string, data: any, customTimeout?: number): Observable<T> {
    const url = this.buildUrl(endpoint);
    const timeoutValue = customTimeout || HTTP_TIMEOUTS.DEFAULT;

    return this.http.patch<T>(url, data, {
      headers: this.defaultHeaders
    }).pipe(
      timeout(timeoutValue),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Realiza una subida de archivos (multipart/form-data)
   */
  protected upload<T>(endpoint: string, formData: FormData, customTimeout?: number): Observable<T> {
    const url = this.buildUrl(endpoint);
    const timeoutValue = customTimeout || HTTP_TIMEOUTS.UPLOAD;

    // Do not set default JSON headers so browser sets the correct multipart boundary
    return this.http.post<T>(url, formData).pipe(
      timeout(timeoutValue),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Construye la URL completa
   */
  private buildUrl(endpoint: string): string {
    // Si el endpoint ya es una URL completa, usarlo directamente
    if (endpoint.startsWith('http')) {
      return endpoint;
    }
    // Ensure we don't break the protocol when joining (preserve 'http://' or 'https://')
    const base = this.baseUrl.replace(/\/+$|\s+/g, '');
    const ep = endpoint.replace(/^\/+/, '');
    // If base starts with http(s):// keep it intact and join with a single slash
    if (/^https?:\/\//i.test(base)) {
      return `${base.replace(/\/+$/, '')}/${ep}`;
    }
    // Otherwise, build a normal absolute URL
    return `${base}/${ep}`;
  }

  /**
   * Construye los parámetros HTTP
   */
  private buildParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }
    
    return httpParams;
  }

  /**
   * Maneja errores HTTP
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string = APP_MESSAGES.ERRORS.UNKNOWN;
    let errorCode = 'UNKNOWN_ERROR';

    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = APP_MESSAGES.ERRORS.NETWORK_ERROR;
      errorCode = 'CLIENT_ERROR';
    } else {
      // Error del servidor
      switch (error.status) {
        case 0:
          errorMessage = APP_MESSAGES.ERRORS.NETWORK_ERROR;
          errorCode = 'NETWORK_ERROR';
          break;
        case 400:
          errorMessage = error.error?.message || 'Solicitud inválida';
          errorCode = 'BAD_REQUEST';
          break;
        case 401:
          errorMessage = APP_MESSAGES.ERRORS.UNAUTHORIZED;
          errorCode = 'UNAUTHORIZED';
          break;
        case 404:
          errorMessage = APP_MESSAGES.ERRORS.NOT_FOUND;
          errorCode = 'NOT_FOUND';
          break;
        case 408:
          errorMessage = APP_MESSAGES.ERRORS.TIMEOUT;
          errorCode = 'TIMEOUT';
          break;
        case 500:
          errorMessage = APP_MESSAGES.ERRORS.SERVER_ERROR;
          errorCode = 'SERVER_ERROR';
          break;
        default:
          errorMessage = error.error?.message || APP_MESSAGES.ERRORS.SERVER_ERROR;
          errorCode = `HTTP_${error.status}`;
      }
    }

    const apiError: IApiError = {
      error: true,
      errorCode,
      errorDescription: errorMessage,
      details: error.error,
      timestamp: new Date().toISOString(),
      requestId: this.generateRequestId()
    };

    console.error('API Error:', apiError);
    return throwError(() => apiError);
  }

  /**
   * Genera un ID único para la petición
   */
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Verifica el estado de la conexión
   */
  public checkConnection(): Observable<boolean> {
    return this.get<string>(API_ENDPOINTS.BFF.PING, null, HTTP_TIMEOUTS.PING).pipe(
      map(() => true),
      catchError(() => throwError(() => false))
    );
  }
}
