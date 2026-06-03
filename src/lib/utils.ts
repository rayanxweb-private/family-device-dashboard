import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Menggabungkan class Tailwind CSS secara kondisional 
 * dan mencegah terjadinya bentrokan class (override).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
