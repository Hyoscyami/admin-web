export interface TreeNode {
  id: number
  name: string
  parentId: number
  isLeaf: boolean
}
export function getRootNode(): TreeNode {
  return {
    id: 1,
    name: '根节点',
    parentId: 0,
    isLeaf: false
  }
}
