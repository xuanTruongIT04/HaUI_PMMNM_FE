import { format } from 'date-fns'

export function formatDate(dateTime?: string) {
  if (!dateTime)
    return ''

  return format(new Date(dateTime), 'yyyy-MM-dd')
}

export function formatDateTime(dateTime?: string) {
  if (!dateTime)
    return ''

  return format(new Date(dateTime), 'yyyy-MM-dd HH:MM:SS')
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
