export function mapArrayToObject<T>(arr: string[]) {
  return Object.fromEntries(arr.map((v) => [v, v])) as T
}

export function mapObjectToArray(obj: Record<string, string> | null) {
  if (!obj) return []
  return Object.values(obj)
}
