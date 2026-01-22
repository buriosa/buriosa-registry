export const STORAGE_KEY = "buriosa-app-state";

export function loadFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;

  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved) as T;
    }
  } catch (error) {
    console.error("Failed to load from storage:", error);
  }
  return defaultValue;
}

export function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save to storage:", error);
  }
}

export function clearStorage(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}

// Aliases for backward compatibility
export const loadState = <T>(defaultValue: T): T =>
  loadFromStorage(STORAGE_KEY, defaultValue);

export const saveState = <T>(state: T): void =>
  saveToStorage(STORAGE_KEY, state);

export const clearState = (): void => clearStorage(STORAGE_KEY);
