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
  statusSelect: Array<number>
  // 类型选择器
  typeSelect?: Array<number>
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
    typeSelect: []
  }
}
