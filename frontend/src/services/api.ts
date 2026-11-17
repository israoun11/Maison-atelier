import axios from 'axios';
import type {
  AdminUser, ContactMessage, ContactPayload, MessageStatus, Project, Service, Stats,
} from '../types';

export const TOKEN_KEY = 'am_token';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  timeout: 15000,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (r) => r,
  (error) => {
    const isLogin = String(error.config?.url || '').includes('/auth/login');
    if (error.response?.status === 401 && !isLogin && localStorage.getItem(TOKEN_KEY)) {
      localStorage.removeItem(TOKEN_KEY);
      if (!window.location.pathname.startsWith('/admin/login')) window.location.assign('/admin/login');
    }
    return Promise.reject(error);
  }
);

export function errorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (!err.response) return 'Cannot reach the server. Please check your connection and try again.';
    const data = err.response.data as { message?: string; errors?: { field: string; message: string }[] };
    const details = data?.errors?.map((e) => `${e.field}: ${e.message}`).join(' · ');
    return [data?.message, details].filter(Boolean).join(' — ') || 'Something went wrong.';
  }
  return 'Something went wrong.';
}

// Public
export const getProjects = (params?: { category?: string; featured?: boolean }) =>
  http.get<{ data: Project[] }>('/projects', { params }).then((r) => r.data.data);
export const getProjectBySlug = (slug: string) =>
  http.get<{ data: Project }>(`/projects/slug/${encodeURIComponent(slug)}`).then((r) => r.data.data);
export const getServices = () => http.get<{ data: Service[] }>('/services').then((r) => r.data.data);
export const submitContact = (payload: ContactPayload) =>
  http.post<{ message: string }>('/contact', payload).then((r) => r.data.message);

// Admin
export const login = (email: string, password: string) =>
  http.post<{ token: string; admin: AdminUser }>('/auth/login', { email, password }).then((r) => r.data);
export const getMe = () => http.get<{ data: AdminUser }>('/auth/me').then((r) => r.data.data);
export const getStats = () => http.get<{ data: Stats }>('/admin/stats').then((r) => r.data.data);

export type ProjectInput = Omit<Project, '_id' | 'slug' | 'createdAt'>;
export const createProject = (p: ProjectInput) => http.post('/projects', p).then((r) => r.data.data as Project);
export const updateProject = (id: string, p: Partial<ProjectInput>) =>
  http.put(`/projects/${id}`, p).then((r) => r.data.data as Project);
export const deleteProject = (id: string) => http.delete(`/projects/${id}`);

export type ServiceInput = Omit<Service, '_id'>;
export const createService = (s: ServiceInput) => http.post('/services', s).then((r) => r.data.data as Service);
export const updateService = (id: string, s: Partial<ServiceInput>) =>
  http.put(`/services/${id}`, s).then((r) => r.data.data as Service);
export const deleteService = (id: string) => http.delete(`/services/${id}`);

export const getMessages = (status?: MessageStatus) =>
  http.get<{ data: ContactMessage[] }>('/contact', { params: status ? { status } : {} }).then((r) => r.data.data);
export const updateMessageStatus = (id: string, status: MessageStatus) =>
  http.patch<{ data: ContactMessage }>(`/contact/${id}/status`, { status }).then((r) => r.data.data);
export const deleteMessage = (id: string) => http.delete(`/contact/${id}`);
