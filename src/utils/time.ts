import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)

dayjs.locale('zh-cn') // 全局使用

export function format(value: string): string {
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
}

export function formatYYYYMMDD(value: string): string {
  return dayjs(value).format('YYYYMMDD')
}

export function formatYYYY(value: string): string {
  return dayjs(value).format('YYYY')
}
