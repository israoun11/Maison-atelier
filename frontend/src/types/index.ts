export interface Project {
  _id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  description: string;
  coverImage: string;
  gallery: string[];
  featured: boolean;
  year?: string;
  area?: string;
  createdAt: string;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  image: string;
}

export type MessageStatus = 'new' | 'read' | 'archived';

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
}

export interface Stats {
  projects: number;
  services: number;
  messages: number;
  newMessages: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}
