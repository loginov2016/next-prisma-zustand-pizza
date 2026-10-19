import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Функция для объединения классов
 * 
 * @param inputs string[]
 * @returns 
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
