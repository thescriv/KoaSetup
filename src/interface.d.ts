import { ErrorParameters } from 'ajv'
import { Context } from 'koa'

export interface HashOf<T> {
  [key: string]: any
}

export interface Error {
  message: string

  param?: ErrorParameters
  keyword?: string
  details?: string
  help?: string
}
