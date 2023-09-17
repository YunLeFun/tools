import { Midjourney } from 'midjourney'

export function createClient(options: {
  SERVER_ID: string
  CHANNEL_ID: string
  SALAI_TOKEN: string
}) {
  const client = new Midjourney({
    ServerId: options.SERVER_ID,
    ChannelId: options.CHANNEL_ID,
    SalaiToken: options.SALAI_TOKEN,
    Debug: import.meta.env.DEV,
  })
  return client
}
