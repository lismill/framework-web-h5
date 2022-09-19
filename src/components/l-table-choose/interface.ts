import {AxiosPromise} from "axios";

export interface ILTableChoose {
  /**
   * 配置默认请求接口
   */
  request?: (params: any) => AxiosPromise<any>;
  /**
   * 配置弹出框
   */
  modal: {
    /**
     * 是否显示弹出框
     */
    visible: boolean;
    /**
     * 配置 UI 组件库扩展属性
     */
    others?: {
      title?: string;
      width: number | string;
    };
  };
  /**
   * 配置搜索条件
   */
  search?: {
    /**
     * 配置搜索的数据
     */
    data: {
      status?: string | number;
    };
    /**
     * 配置搜索的表单
     */
    forms?: Array<{
      /**
       * 配置搜索的类型
       */
      type?: undefined | "input" | "select" | "date" | "daterange" | "slot" | "hidden";
      /**
       * 配置搜索的字段
       */
      field: string;
      /**
       * 配置搜索的标题
       */
      label: string;
      /**
       * 配置搜索的其他配置
       */
      options?: Array<{label: string; value: string | number}>;
      /**
       * 配置 UI 组件库扩展属性
       */
      others?: any;
    }>;
  };
  /**
   * 配置状态栏
   */
  status?: {
    /**
     * 配置状态栏表单值
     */
    prop: string;
    /**
     * 配置状态栏元素
     */
    items: Array<{
      /**
       * 配置状态栏元素名称
       */
      name: string;
      /**
       * 配置状态栏元素值
       */
      value: string | number;
      /**
       * 配置状态栏元素总数
       */
      total?: string | number;
    }>;
  };
  /**
   * 配置表格
   */
  table: {
    data: Array<any>;
    selectedType?: "checkbox" | "radio" | undefined;
    selectedRows?: Array<any>;
    columns: Array<{
      /**
       * 配置列类型
       */
      type?: undefined | "slot";
      /**
       * 配置列标题
       */
      title: string;
      /**
       * 配置列属性
       */
      dataIndex: string;
      /**
       * 配置列宽度
       */
      width?: number;
      /**
       * 配置 UI 组件库扩展属性
       */
      others?: {
        /**
         * 配置是否显示省略号
         */
        ellipsis?: boolean;
        /**
         * 配置是否显示提示信息
         */
        tooltip?: boolean;
        /**
         * 配置扩展属性
         */
        [key: string]: any;
      };
    }>;
    /**
     * 配置 UI 组件库扩展属性
     */
    others: any;
  };
  /**
   * 配置底部栏
   */
  footer?: {
    /**
     * 配置右侧分页
     */
    pagination: {
      /**
       * 配置自定义分页参数属性
       */
      props?: {
        page?: string;
        size?: string;
      };
      /**
       * 配置分页总数
       */
      total: number;
      /**
       * 配置默认当前分页
       */
      page?: number;
      /**
       * 配置默认页数
       */
      size?: number;
      /**
       * 配置可选择的每页数量
       */
      pageSizes?: Array<number>;
      /**
       * 配置 UI 组件库扩展属性
       */
      others?: any;
    };
  };
}
