import {defineStore} from "pinia";
import storage from "@/utils/local-storage";

const useStoreCommon = defineStore("STORE_COMMON", {
  state: () => {
    return {
      version: "v1.0",
      fulllScreen: storage.get("fullscreen") ?? false,
    };
  },
  actions: {
    changeVersion(v: string) {
      this.version = v;
    },
    changeFulllScreen(b: boolean) {
      storage.set("fullscreen", b);
      this.fulllScreen = b;
    },
  },
});
export default useStoreCommon;
