export interface ILPermissionCard {
  name: string;
  icon?: string;
  checked: Array<string>;
  permission: string;
  children?: Array<{
    name: string;
    permission: string;
  }>;
}
