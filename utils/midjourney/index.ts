import { Midjourney } from 'midjourney'

export function createClient(options: {
  SERVER_ID: string
  CHANNEL_ID: string
  SALAI_TOKEN: string
}) {
  const client = new Midjourney(options.SERVER_ID, options.CHANNEL_ID, options.SALAI_TOKEN, true)
  return client
}
