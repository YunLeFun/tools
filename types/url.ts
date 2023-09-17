export interface BaseParamItem<T = string> {
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
   * 默认值
   */
  value: T
  /**
   * 可选项
   */
  choices?: {
    label: string
    value: T
  }[]
  /**
   * 可选 query 类型
   */
  type: BooleanParamItem['type'] | StringParamItem['type'] | DatetimeParamItem['type']
}

export interface BooleanParamItem extends BaseParamItem<boolean> {
  type: 'boolean'
}

export interface StringParamItem extends BaseParamItem<string> {
  type: 'string'
}

export interface DatetimeParamItem extends BaseParamItem<string> {
  /**
   * 日期时间类型 YYYY-MM-DD HH:mm:ss
   */
  type: 'datetime'
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
