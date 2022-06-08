import { Context } from 'koa'

export interface ContextApp extends Context {  }

export Next 

export interface Error {
    message: string

    param?: string
    keyword?: string
    details?: string
    help?: string
}