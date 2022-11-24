import { listChildrenByCode } from '../api/sys/dict'
import { ElMessage } from 'element-plus'


export function isEmptyCollection(collection: Array<any>) {
  return collection === undefined || collection.length === 0
}


export function isNotEmptyCollection(collection: Array<any>) {
  return !isEmptyCollection(collection)
}


export function isBlank(str: string | undefined) {
  return str === undefined || str === '' || str.length === 0
}

export function isNull(value: number) {
  return value === undefined || value === null
}


export async function dictConvert(code: string, value: string): Promise<string> {
  let name: string = ''
  await listChildrenByCode(code).then((response) => {
    const dict = response.data.find((item: any) => {
      return item.value === value
    })
    if (dict) {
      name = dict.name
    }
  })
  return name
}


export function successMsg(msg: string) {
  ElMessage.success({
    message: msg,
    type: 'success'
  })
}


export function warningMsg(msg: string) {
  ElMessage.warning({
    message: msg,
    type: 'warning'
  })
}


export function errorMsg(msg: string) {
  ElMessage.error(msg)
}
