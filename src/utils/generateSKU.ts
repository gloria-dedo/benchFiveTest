export function generateSKU(): string {
  return "SKU-" + Math.random().toString(36).substring(2, 9).toUpperCase();
}