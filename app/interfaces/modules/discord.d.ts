declare module 'discord.js' {
    interface Client {
      // eslint-disable-next-line @typescript-eslint/method-signature-style
      start(token: string): Promise<void>
    }
  }
  import { type Message } from 'discord.js'
  
  export interface collectorButtonsForModals {
    modal?: boolean
    title?: string
    label?: string
    style?: number
    type?: string
    maxLength?: number
    placeholder?: string
  }
  
  export type CustomIdHandlers = Record<string, () => undefined | Promise<void> | Promise<Message<boolean>> >
  export type SystemCustomIdHandlers = Record<string, { info: string, remove?: string, type?: string }>
  
  export { }