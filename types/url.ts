export interface BaseParamItem {
  /**
   * 显示的名称
   */
  label: string
  /**
   * 用于存储的 key
   */
  key: string
  /**
   * 是否显示
   */
  visible?: boolean
  /**
   * 可选的值
   */
  choices?: {
    label: string
    value: string
  }[]
  /**
   * 可选 query 类型
   */
  type: 'boolean' | 'string' | 'datetime'
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
  /**
   * 日期时间类型 YYYY-MM-DD HH:mm:ss
   */
  type: 'datetime'
  value: string
}

export type ParamItem = BooleanParamItem | StringParamItem | DatetimeParamItem

export interface UrlItem {
  name: string
  /**
   * URL 地址
   */
  url: string
  // type: string
  params: ParamItem[]
  script?: string
}
