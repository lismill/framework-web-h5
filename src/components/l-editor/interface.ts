export interface ILEditor {
  content?: string;
  disabled?: boolean;
  mode?: "normal" | "simple";
  height?: number;
  toolbarConfig?: any;
  editorConfig?: any;
}
