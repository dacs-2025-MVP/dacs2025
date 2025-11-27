import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BaseApiService } from './base-api.service';
import { IRequestTest } from '../models/irequest-test';
import { ITestResponse } from '../models/iresponse';
import { IApiResponse, IStatusResponse } from '../models/api-response';
import { API_ENDPOINTS, CLIENTES_ENDPOINTS, VEHICULOS_ENDPOINTS } from '../constants/api-endpoints';
import { environment } from '../../../environments/environment';

/**
 * Servicio para operaciones de API específicas de la aplicación
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseApiService {

  /**
   * Verifica el estado de conexión con el backend
   */
  getPing(): Observable<string> {
    const url = `${environment.backendForFrontendUrl}/ping`;
    console.log('ApiService - Ping URL:', url);

    return this.http.get<string>(url, {
      responseType: 'text' as 'json',
      headers: this.defaultHeaders
    }).pipe(
      map(response => response || 'OK'),
      catchError((error) => {
        console.error('ApiService - Ping Error:', error);
        throw new Error('Error de conexión con el backend');
      })
    );
  }

  /**
   * Obtiene el estado detallado del sistema
   */
  getSystemStatus(): Observable<IStatusResponse> {
    return this.get<IStatusResponse>(API_ENDPOINTS.BFF.HEALTH);
  }

  /**
   * Obtiene datos de prueba desde el archivo JSON local
   */
  getTest(): Observable<ITestResponse> {
    // Para archivos locales, usamos HttpClient directamente
    return this.http.get<ITestResponse>(API_ENDPOINTS.ASSETS.TEST_DATA).pipe(
      catchError(() => {
        throw new Error('Error al cargar datos de prueba');
      })
    );
  }

  /**
   * Obtiene datos de prueba desde el backend
   */
  getTestFromBackend(): Observable<IApiResponse<ITestResponse>> {
    return this.get<IApiResponse<ITestResponse>>('test');
  }

  /**
   * Envía datos de prueba al backend
   */
  sendTestData(data: IRequestTest): Observable<IApiResponse<any>> {
    return this.post<IApiResponse<any>>('test', data);
  }

  /**
   * Obtiene datos del dashboard
   */
  getDashboardData(): Observable<IApiResponse<any>> {
    return this.get<IApiResponse<any>>(API_ENDPOINTS.BFF.DASHBOARD);
  }

  /**
   * Obtiene información del usuario actual
   */
  getCurrentUser(): Observable<IApiResponse<any>> {
    return this.get<IApiResponse<any>>(API_ENDPOINTS.BFF.USER);
  }

  /**
   * Obtiene la lista de clientes desde el BFF (backend path: /usuarios)
   */
  getClientes(): Observable<IApiResponse<any>> {
    // Normalizamos la respuesta para aceptar tanto:
    // - respuestas envueltas: { data: [...] }
    // - respuestas directas: [ {...}, ... ]
    return this.get<any>(CLIENTES_ENDPOINTS.LIST).pipe(
      map((resp) => {
        if (Array.isArray(resp)) {
          return { data: resp } as IApiResponse<any>;
        }
        if (resp && resp.data !== undefined) {
          return resp as IApiResponse<any>;
        }
        // Fallback: wrap whatever came back into data
        return { data: resp } as IApiResponse<any>;
      })
    );
  }

  /**
   * Obtiene la lista de vehículos desde el BFF
   */
  getVehiculos(): Observable<IApiResponse<any>> {
    return this.get<IApiResponse<any>>(VEHICULOS_ENDPOINTS.LIST);
  }

  /**
   * Obtiene un cliente por id
   */
  getClienteById(id: string | number): Observable<IApiResponse<any>> {
    const endpoint = `${CLIENTES_ENDPOINTS.LIST}/${id}`;
    return this.get<IApiResponse<any>>(endpoint);
  }

  /**
   * Elimina un cliente por id
   */
  deleteCliente(id: number): Observable<void> {
    const endpoint = `${CLIENTES_ENDPOINTS.LIST}/${id}`;
    return this.delete<void>(endpoint);
  }

  /**
   * Elimina un vehículo por id
   */
  deleteVehiculo(id: number): Observable<void> {
    const endpoint = `${VEHICULOS_ENDPOINTS.LIST}/${id}`;
    return this.delete<void>(endpoint);
  }

  /**
   * Crea un nuevo cliente (proxied to backend /usuarios)
   */
  createCliente(payload: any): Observable<any> {
    return this.post<any>(CLIENTES_ENDPOINTS.LIST, payload);
  }

  /**
   * Actualiza un cliente por id
   */
  updateCliente(id: string | number, payload: any): Observable<any> {
    const endpoint = `${CLIENTES_ENDPOINTS.LIST}/${id}`;
    return this.put<any>(endpoint, payload);
  }

  /**
   * Crea un vehículo
   */
  createVehiculo(payload: any): Observable<any> {
    return this.post<any>(VEHICULOS_ENDPOINTS.LIST, payload);
  }

  /**
   * Obtiene un vehículo por id
   */
  getVehiculoById(id: string | number): Observable<IApiResponse<any>> {
    const endpoint = `${VEHICULOS_ENDPOINTS.LIST}/${id}`;
    return this.get<IApiResponse<any>>(endpoint);
  }

  /**
   * Actualiza un vehículo (parcialmente)
   */
  updateVehiculo(id: string | number, payload: any): Observable<any> {
    const endpoint = `${VEHICULOS_ENDPOINTS.LIST}/${id}`;
    return this.put<any>(endpoint, payload);
  }

  verifyDni(documentNumber: string): Observable<any> {
    const endpoint = `${CLIENTES_ENDPOINTS.VERIFY}/${documentNumber}`;
    return this.get<any>(endpoint);
  }
}
