// T is data, Q is query
export interface Table<T, Q> {
  // 表格数据
  tableData: Array<T>
  // 总数
  total: number
  // 加载状态
  listLoading: boolean
  // 查询条件
  listQuery: Q
  // 状态选择器
  statusSelect: Array<SelectGroup>
  // 类型选择器
  typesSelect?: Array<SelectGroup>
  //年份选择器
  yearsSelect?: Array<SelectGroup>
  //组织选择器
  orgsSelect?: Array<SelectGroup>
}

/**
 * 下拉框
 */
export interface SelectGroup {
  // ID
  id: number
  //显示文本
  text: string
  //值
  value: number
}

/**
 * 初始化table
 * @param query
 */
export function useTable<T, Q>(query: Q): Table<T, Q> {
  return {
    tableData: [],
    total: 0,
    listLoading: true,
    listQuery: query,
    // 状态选择器
    statusSelect: [],
    // 类型选择器
    typesSelect: [],
    //年份选择器
    yearsSelect: [],
    //组织选择器
    orgsSelect: []
  }
}
