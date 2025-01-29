import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// The cn function combines tailwind-merge with clsx to conditionally merge class names.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mapDataAsync = async <T>(
  data: any,
  transformFn: (item: any) => Promise<T>
): Promise<T | T[] | null> => {
  if (!data) return null;

  // Handle arrays
  if (Array.isArray(data)) {
    return Promise.all(data.map((item) => transformFn(item)));
  }

  // Handle single object
  if (typeof data === 'object' && data !== null) {
    return transformFn(data);
  }

  // Return data as-is if type is unsupported
  return Promise.resolve(data);
};
