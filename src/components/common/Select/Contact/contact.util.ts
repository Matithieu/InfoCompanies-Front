import { Contact } from '@/types/index.types'

// Convert Contact object back to array of strings
export const fromContactObject = (
  Contact: Contact | undefined,
): (keyof Contact)[] => {
  if (!Contact) return []
  return Object.keys(Contact).filter(
    (key) => Contact[key as keyof Contact] !== '',
  ) as (keyof Contact)[]
}
