export interface ILForm {
  /**
   * 表单配置
   */
  form: {
    /**
     * 表单标题
     */
    title?: string;
    /**
     * 表单禁用
     */
    disabled?: boolean;
    /**
     * 底部操作按钮对齐方式
     */
    operatesAlign?: "left" | "center" | "right";
    /**
     * 底部操作按钮
     */
    operates?: {
      /**
       * 底部左侧操作按钮
       */
      left?: Array<ILFormOperates>;
      /**
       * 底部中间重置按钮
       */
      centerShowResetButton?: boolean;
      /**
       * 底部中间保存按钮
       */
      centerShowSubmitButton?: boolean;
      /**
       * 底部中间操作按钮
       */
      center?: Array<ILFormOperates>;
      /**
       * 底部右侧操作按钮
       */
      right?: Array<ILFormOperates>;
    };
    /**
     * 表单数据
     */
    data: any;
    /**
     * 其他扩展属性
     */
    others?: any;
  };
  sections: Array<{
    /**
     * 区块标题
     */
    title?: string;
    /**
     * 区块表单项
     */
    items: Array<{
      /**
       * 表单项类型
       */
      type:
        | undefined
        | "text"
        | "switch"
        | "input"
        | "textarea"
        | "number"
        | "select"
        | "select-search"
        | "cascader"
        | "radio"
        | "checkbox"
        | "date"
        | "time"
        | "daterange"
        | "upload"
        | "editor"
        | "slot"
        | "hidden";
      /**
       * 表单项 label
       */
      label: string;
      /**
       * 表单项 name
       */
      name: string;
      /**
       * 表单项大小 "small" | "medium" | "large"
       */
      size?: "mini" | "small" | "medium" | "large";
      /**
       * 表单项校验
       */
      rules?: Array<any>;
      /**
       * 表单项介绍
       */
      info?: string;
      /**
       * 表单项提示
       */
      tooltip?: string;
      /**
       * 下拉 / 级联数据
       */
      options?: Array<any>;
      /**
       * 其他扩展属性
       */
      others?: any;
    }>;
  }>;
}

export interface ILFormOperates {
  /**
   * 操作按钮名称
   */
  name: string;
  /**
   * 操作按钮扩展属性
   */
  others?: {
    /**
     * 绑定权限节点
     */
    permission?: string;
    /**
     * 其他扩展属性
     */
    [key: string]: any;
  };
}
