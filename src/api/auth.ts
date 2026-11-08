// MEMBER 3: the only place that talks to the API. Components call these functions.
// DEMO REQUIREMENT: every request, response and error is logged in the browser console.
// The password and the token are NOT printed (the activity says: never console.log the token).
const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = 'campusconnect_token';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

export interface LoginResult {
  token: string;
  user: AuthUser;
}

// status 0 means the server could not be reached (network error).
export class ApiError extends Error {
  status: number;

  constructor(status: number) {
    super(`Request failed with status ${status}`);
    this.status = status;
  }
}

async function send(
  label: string,
  path: string,
  init: RequestInit,
  loggedRequest: unknown,
): Promise<Response> {
  // 1. Log the request BEFORE sending it.
  console.log(`[API request] ${label}`, loggedRequest);

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, init);
  } catch (error) {
    // 3. Error logging: the server is stopped or the address is wrong.
    console.error(`[API error] ${label}: cannot reach the server`, error);
    throw new ApiError(0);
  }

  // fetch does NOT fail on 4xx or 5xx, so we check response.ok ourselves.
  if (!response.ok) {
    let detail: unknown = null;
    try {
      detail = await response.json();
    } catch {
      detail = null;
    }
    console.error(`[API error] ${label}: status ${response.status}`, detail);
    throw new ApiError(response.status);
  }
  return response;
}

export async function login(email: string, password: string): Promise<LoginResult> {
  const response = await send(
    'POST /sessions',
    '/sessions',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    },
    { email, password: '********' }, // password hidden in the console
  );
  const data = (await response.json()) as LoginResult;
  // 2. Log the response AFTER receiving it (token hidden).
  console.log(`[API response] POST /sessions`, response.status, {
    user: data.user,
    token: '[hidden]',
  });
  return data;
}

export async function getMe(token: string): Promise<AuthUser> {
  const response = await send(
    'GET /users/me',
    '/users/me',
    { headers: { Authorization: `Bearer ${token}` } },
    { headers: { Authorization: 'Bearer [hidden]' } },
  );
  const user = (await response.json()) as AuthUser;
  console.log(`[API response] GET /users/me`, response.status, user);
  return user;
}

// The token lives in sessionStorage. Never log it and never put it in the URL.
export function saveToken(token: string): void {
  try {
    sessionStorage.setItem(TOKEN_KEY, token);
  } catch {
    // storage blocked: the user simply will not stay logged in after a refresh
  }
}

export function getToken(): string | null {
  try {
    return sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function clearToken(): void {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    // nothing to clear
  }
}