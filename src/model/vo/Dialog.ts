
import { BaseVO } from '../resp/base/BaseVO'

export interface Dialog<V extends BaseVO, R, A, U> {

  visible: boolean

  viewDialogVisible: boolean

  viewDetailData: V

  dialogStatus: string

  textMap: {
    update: '编辑'
    create: '新增'
  }

  form: A | U

  rules: R
}


export function useDialog<V extends BaseVO, R, A, U>(vo: V, rule: R, add: A): Dialog<V, R, A, U> {
  return {

    visible: false,

    viewDialogVisible: false,

    viewDetailData: vo,

    dialogStatus: '',

    textMap: {
      update: '编辑',
      create: '新增'
    },

    form: add,

    rules: rule
  }
}
