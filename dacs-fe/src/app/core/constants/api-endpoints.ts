/**
 * Constantes para endpoints de la API
 */
export const API_ENDPOINTS = {
  // Backend for Frontend
  BFF: {
    BASE_URL: 'bff',
    PING: 'ping',
    HEALTH: 'health',
    USER: 'user',
    DASHBOARD: 'dashboard'
  },
  
  // Usuarios (clientes)
  USUARIOS: {
    LIST: 'usuarios'
  },
  
  // Assets locales
  ASSETS: {
    TEST_DATA: 'assets/json/test.json',
    CONFIG: 'assets/config/app-config.json'
  }
} as const;

/**
 * Cliente endpoints (frontend naming) - los paths reales en el backend son `/usuarios`.
 */
export const CLIENTES_ENDPOINTS = {
  // Use the '/clientes' path on the BFF for frontend clients flows. The BFF
  // proxies to backend /usuarios as needed.
  LIST: 'clientes'
} as const;


/**
 * Constantes para headers HTTP
 */
export const HTTP_HEADERS = {
  CONTENT_TYPE: 'Content-Type',
  AUTHORIZATION: 'Authorization',
  ACCEPT: 'Accept',
  APPLICATION_JSON: 'application/json',
  BEARER: 'Bearer'
} as const;

/**
 * Timeouts para requests HTTP
 */
export const HTTP_TIMEOUTS = {
  DEFAULT: 30000, // 30 segundos
  PING: 5000,     // 5 segundos
  UPLOAD: 60000   // 60 segundos
} as const;
