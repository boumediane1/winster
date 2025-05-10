import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) => {
    return date.toLocaleString('default', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};
