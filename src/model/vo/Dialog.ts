// V是查看详情的VO，R是规则，A是新增的req
import { BaseVO } from '../resp/base/BaseVO'

export interface Dialog<V extends BaseVO, R, A> {
  // 是否可见
  visible: boolean
  // 查看详情的数据
  viewDetailData: V
  // 对话框状态
  dialogStatus: string
  // 新增或编辑数据字典弹框
  textMap: {
    update: '编辑'
    create: '新增'
  }
  // 新增数据字段表单
  form: A
  // 新增规则
  rules: R
}

/**
 * 使用弹框
 * @param vo vo数据
 * @param rule 表单提交规则
 * @param add
 */
export function useDialog<V extends BaseVO, R, A>(vo: V, rule: R, add: A): Dialog<V, R, A> {
  return {
    // 是否可见
    visible: false,
    // 查看详情的数据
    viewDetailData: vo,
    // 新增或编辑数据字段对话框状态
    dialogStatus: '',
    // 新增或编辑数据字典弹框
    textMap: {
      update: '编辑',
      create: '新增'
    },
    // 新增数据字段表单
    form: add,
    // 新增数据字典规则
    rules: rule
  }
}
