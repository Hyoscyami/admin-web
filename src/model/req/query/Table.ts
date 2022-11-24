
export interface Table<T, Q> {

  tableData: Array<T>

  total: number

  listLoading: boolean

  listQuery: Q

  statusSelect: Array<SelectGroup>

  typesSelect?: Array<SelectGroup>

  yearsSelect?: Array<SelectGroup>

  orgsSelect?: Array<SelectGroup>
}


export interface SelectGroup {

  id: number

  text: string

  value: number
}


export function useTable<T, Q>(query: Q): Table<T, Q> {
  return {
    tableData: [],
    total: 0,
    listLoading: true,
    listQuery: query,

    statusSelect: [],

    typesSelect: [],

    yearsSelect: [],

    orgsSelect: []
  }
}
