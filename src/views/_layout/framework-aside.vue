<template>
  <div class="framework-aside">
    <m-menu
      :style="{width: '200px', height: '100%'}"
      :default-open-keys="defaultOpenKeys"
      :selected-keys="defaultSelectedKeys"
      :default-selected-keys="defaultSelectedKeys"
      breakpoint="sm"
      @menu-item-click="(key: string) => jump(key)"
    >
      <template v-for="first in menus" :key="first.name">
        <!-- 一级菜单 - 无二级菜单 -->
        <template v-if="first.children?.length === 1">
          <template v-if="!first.meta?.hidden">
            <m-menu-item :key="first.name">
              <template v-if="first.meta?.icon" #icon>
                <l-svg-icon :name="(first.meta?.icon as string)" size="18"></l-svg-icon>
              </template>
              {{ first.meta?.title }}
            </m-menu-item>
          </template>
        </template>

        <!-- 一级菜单 - 有二级菜单 -->
        <m-sub-menu v-else-if="!first.meta?.hidden" :key="first.name">
          <template v-if="first.meta?.icon" #icon>
            <l-svg-icon :name="(first.meta?.icon as string)" size="18"></l-svg-icon>
          </template>
          <template #title>{{ first.meta?.title }}</template>
          <template v-for="second in first.children">
            <!-- 二级菜单 - 无三级菜单 -->
            <template v-if="!second?.children?.length">
              <template v-if="!second.meta?.hidden">
                <m-menu-item :key="second.name">
                  <template v-if="second.meta?.icon" #icon>
                    <l-svg-icon :name="(second.meta?.icon as string)" size="18"></l-svg-icon>
                  </template>
                  {{ second.meta?.title }}
                </m-menu-item>
              </template>
            </template>
            <!-- 二级菜单 - 有三级菜单 -->
            <template v-else-if="!second.meta?.hidden">
              <m-sub-menu :key="second.name">
                <template v-if="second.meta?.icon" #icon>
                  <l-svg-icon :name="(second.meta?.icon as string)" size="18"></l-svg-icon>
                </template>
                <template #title>{{ second.meta?.title }}</template>
                <!-- 三级菜单 -->
                <template v-if="second.children?.length">
                  <template v-if="!second.meta?.hidden">
                    <m-menu-item v-for="three in second.children" :key="three.name">
                      <template v-if="three.meta?.icon" #icon>
                        <l-svg-icon :name="(three.meta?.icon as string)" size="18"></l-svg-icon>
                      </template>
                      {{ three.meta?.title }}
                    </m-menu-item>
                  </template>
                </template>
              </m-sub-menu>
            </template>
          </template>
        </m-sub-menu>
      </template>
    </m-menu>
  </div>
</template>
<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import {SIDER_ROUTES} from "@/router";
import {jump} from "@/hooks/useWindow";
import storage from "@/utils/local-storage";
import useStorePermission from "@/store/permission";

const USE_STORE_PERMISSION = useStorePermission();
const ROUTE = useRoute();
const defaultOpenKeys = ref<Array<string>>([]);
const defaultSelectedKeys = ref<Array<string>>([]);

// 处理权限节点
const menus: any = ref(SIDER_ROUTES);
const filterPermissionNode = () => {
  const roleId = storage.get("userinfo")?.roleId ?? "";
  const {permissions} = USE_STORE_PERMISSION;
  /**
   * 警告
   * 这是为了显示而显示，请根据项目的环境进行具体的判断
   */
  if (!roleId || !permissions) return;
  if (roleId === -999) return;

  menus.value = SIDER_ROUTES.filter((item: any) => permissions.includes(String(item.meta?.permission)))
    .map((item: any) => {
      const children = item.children.filter((children: {meta: {permission: number}}) =>
        permissions.includes(String(children.meta?.permission)),
      );
      return {...item, children};
    })
    .filter((item) => item.children?.length);
};
filterPermissionNode();

// 重置菜单激活和展开状态
const resetOpenAndSelectedKeys = () => {
  const matched = ROUTE.matched.map((item) => item.name);
  // 默认打开菜单
  defaultOpenKeys.value = matched as Array<string>;
  // 默认激活菜单
  defaultSelectedKeys.value = matched as Array<string>;
  // 自定义激活菜单
  ROUTE.meta?.active && (defaultSelectedKeys.value = [ROUTE.meta.active as string]);
};

watch(
  () => ROUTE.path,
  () => resetOpenAndSelectedKeys(),
  {immediate: true},
);
</script>
