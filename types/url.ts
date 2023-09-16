export interface BaseParamItem {
  label: string
  key: string
  visible?: boolean
  choices?: {
    label: string
    value: string
  }[]
}

export interface BooleanParamItem extends BaseParamItem {
  type: 'boolean'
  value: boolean
}

export interface StringParamItem extends BaseParamItem {
  type: 'string'
  value: string
}

export interface DatetimeParamItem extends BaseParamItem {
  type: 'datetime'
  value: string
}

export type ParamItem = BooleanParamItem | StringParamItem | DatetimeParamItem

export interface UrlItem {
  name: string
  url: string
  // type: string
  params: ParamItem[]
  script?: string
}
