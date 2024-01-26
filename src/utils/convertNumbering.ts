export default function convertNumbering(value: string | number) {
  // This hook is for converting from One-based numbering to Zero-based numbering
  if (typeof value === 'string') {
    return parseInt(value) - 1
  }
  return value - 1
}
