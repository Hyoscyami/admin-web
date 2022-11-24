import { BaseVO } from '../resp/base/BaseVO'

export interface FileVO extends BaseVO {

  relationId: number


  type: number


  name: string


  url: string
}
