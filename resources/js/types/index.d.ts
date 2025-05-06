import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export type NavItem =
    | {
          title: string;
          icon?: LucideIcon | null;
          href: string;
          isActive?: boolean;
      }
    | {
          title: string;
          icon?: LucideIcon | null;
          children: {
              title: string;
              href: string;
              icon?: LucideIcon | null;
              isActive?: boolean;
          }[];
      };

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface Page<T> {
    data: T[];
    current_page: number;
    per_page: number;
    total: number;
}

export interface User {
    uuid: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
