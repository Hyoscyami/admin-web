import { listChildrenByCode } from '../services/sys/dict'
import { ElMessage } from 'element-plus'

/**
 * 是否为空集合
 * @param collection
 * @returns {boolean} true：是，false：否
 */
export function isEmptyCollection(collection: Array<any>) {
  return collection === undefined || collection.length === 0
}

/**
 * 是否不为空集合
 * @param collection
 * @returns {boolean} true：是，false：否
 */
export function isNotEmptyCollection(collection: Array<any>) {
  return !isEmptyCollection(collection)
}

/**
 * 字符串是否为空
 * @param str
 * @returns {boolean}
 */
export function isBlank(str: string) {
  return str === undefined || str.length === 0
}

/**
 * 数据字典转换
 * @param code
 * @param value
 */
export function dictConvert(code: string, value: string) {
  listChildrenByCode(code).then((response) => {
    const dict = response.data.find((item: any) => {
      return item.value === value
    })
    console.log('dict:', dict)
    value = dict.name
    console.log('value:', value)
  })
  return value
}
// 封装msg文案提示成功
export function successMsg(msg: string) {
  ElMessage.success({
    message: msg,
    type: 'success'
  })
}
// 封装msg文案提示警告
export function warningMsg(msg: string) {
  ElMessage.warning({
    message: msg,
    type: 'warning'
  })
}
