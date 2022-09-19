export interface ILTableOperate {
  /**
   * 名称
   */
  name: string;
  /**
   * 是否显示
   */
  show?: boolean;
  /**
   * 弹出确认框文案
   */
  popconfirm?: string;
  /**
   * 绑定权限节点
   */
  permission?: string;
}
