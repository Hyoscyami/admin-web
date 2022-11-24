export interface BaseQuery {
  
  page: number
  
  size: number
  
  types?: Array<number>
  
  status?: Array<number>
  
  name: string
}
