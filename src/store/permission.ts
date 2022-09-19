import {defineStore} from "pinia";

const useStorePermission = defineStore("STORE_PERMISSION", {
  state: () => {
    return {
      permissions: ["all"],
    };
  },
  actions: {
    changePermission(v: string) {
      this.permissions = v.split(",");
    },
  },
});
export default useStorePermission;
