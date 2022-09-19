<template>
  <div v-if="config.form?.data && config.sections?.length" class="l-form p-t24">
    <h3 v-if="config.form?.title" class="p-lr24">{{ config.form.title }}</h3>
    <!-- 表单项 -->
    <div class="m-lr24">
      <m-form
        ref="formRef"
        class="p-b24"
        :auto-label-width="true"
        :model="config.form.data"
        v-bind="config.form.others"
        @submit-success="handleSubmitSuccess"
        @submit-failed="handleSubmitFailed"
      >
        <div v-for="(section, index) in config.sections" :key="index">
          <div v-if="section.title" class="section-title m-b24">{{ section.title }}</div>
          <div class="p-l24" :class="[config?.dialog ? '' : 'p-b56']">
            <template v-for="item in section.items" :key="item.name">
              <m-col v-if="item.type && item.type !== 'hidden'" :span="getSpan(item.size)">
                <!-- text -->
                <m-form-item v-if="item.type === 'text'" :field="item.name" :label="item.label" :rules="item.rules">
                  <template #label><form-tooltip v-bind="item"></form-tooltip></template>
                  <div class="l-h32" v-html="config.form.data[item.name]"></div>
                  <template v-if="item.info" #extra>
                    <form-info :info="item.info"></form-info>
                  </template>
                </m-form-item>
                <!-- switch -->
                <m-form-item v-if="item.type === 'switch'" :field="item.name" :label="item.label" :rules="item.rules">
                  <template #label><form-tooltip v-bind="item"></form-tooltip></template>
                  <m-switch
                    v-model="config.form.data[item.name]"
                    :default-checked="false"
                    :disabled="config.form?.disabled ?? false"
                    v-bind="item.others"
                  />
                  <template v-if="item.info" #extra>
                    <form-info :info="item.info"></form-info>
                  </template>
                </m-form-item>
                <!-- input -->
                <m-form-item v-if="item.type === 'input'" :field="item.name" :label="item.label" :rules="item.rules">
                  <template #label><form-tooltip v-bind="item"></form-tooltip></template>
                  <m-input
                    v-model="config.form.data[item.name]"
                    default-value=""
                    :allow-clear="true"
                    :placeholder="`请输入${item.label}`"
                    :disabled="config.form?.disabled ?? false"
                    v-bind="item.others"
                  />
                  <template v-if="item.info" #extra>
                    <form-info :info="item.info"></form-info>
                  </template>
                </m-form-item>
                <!-- textarea -->
                <m-form-item v-if="item.type === 'textarea'" :field="item.name" :rules="item.rules">
                  <template #label><form-tooltip v-bind="item"></form-tooltip></template>
                  <m-textarea
                    v-model="config.form.data[item.name]"
                    default-value=""
                    :show-word-limit="true"
                    :max-length="200"
                    :allow-clear="true"
                    :placeholder="`请输入${item.label}`"
                    :disabled="config.form?.disabled ?? false"
                    v-bind="item.others"
                  />
                  <template v-if="item.info" #extra>
                    <form-info :info="item.info"></form-info>
                  </template>
                </m-form-item>
                <!-- number -->
                <m-form-item v-if="item.type === 'number'" :field="item.name" :rules="item.rules">
                  <template #label><form-tooltip v-bind="item"></form-tooltip></template>
                  <m-input-number
                    v-model="config.form.data[item.name]"
                    :placeholder="`请输入${item.label}`"
                    :disabled="config.form?.disabled ?? false"
                    v-bind="item.others"
                  />
                  <template v-if="item.info" #extra>
                    <form-info :info="item.info"></form-info>
                  </template>
                </m-form-item>
                <!-- select -->
                <m-form-item v-if="item.type === 'select'" :field="item.name" :rules="item.rules">
                  <template #label><form-tooltip v-bind="item"></form-tooltip></template>
                  <m-select
                    v-model="config.form.data[item.name]"
                    :default-value="[]"
                    :options="item.options"
                    :field-names="{label: 'label', value: 'value'}"
                    :allow-clear="true"
                    :placeholder="`请选择${item.label}`"
                    :disabled="config.form?.disabled ?? false"
                    v-bind="item.others"
                  />
                  <template v-if="item.info" #extra>
                    <form-info :info="item.info"></form-info>
                  </template>
                </m-form-item>
                <!-- select-search -->
                <m-form-item v-if="item.type === 'select-search'" :field="item.name" :rules="item.rules">
                  <template #label><form-tooltip v-bind="item"></form-tooltip></template>
                  <l-form-select-search
                    :placeholder="`请选择${item.label}`"
                    v-bind="item.others"
                    @change="(v) => (config.form.data[item.name] = v)"
                  />
                  <template v-if="item.info" #extra>
                    <form-info :info="item.info"></form-info>
                  </template>
                </m-form-item>
                <!-- cascader -->
                <m-form-item v-if="item.type === 'cascader'" :field="item.name" :rules="item.rules">
                  <template #label><form-tooltip v-bind="item"></form-tooltip></template>
                  <m-cascader
                    v-model="config.form.data[item.name]"
                    :default-value="[]"
                    :options="item.options"
                    :field-names="{label: 'label', value: 'value'}"
                    :allow-clear="true"
                    :placeholder="`请选择${item.label}`"
                    :disabled="config.form?.disabled ?? false"
                    v-bind="item.others"
                  >
                  </m-cascader>
                  <template v-if="item.info" #extra>
                    <form-info :info="item.info"></form-info>
                  </template>
                </m-form-item>
                <!-- radio -->
                <m-form-item v-if="item.type === 'radio'" :field="item.name" :rules="item.rules">
                  <template #label><form-tooltip v-bind="item"></form-tooltip></template>
                  <m-radio-group
                    v-model="config.form.data[item.name]"
                    :disabled="config.form?.disabled ?? false"
                    :options="item.options"
                    v-bind="item.others"
                  />
                  <template v-if="item.info" #extra>
                    <form-info :info="item.info"></form-info>
                  </template>
                </m-form-item>
                <!-- checkbox -->
                <m-form-item v-if="item.type === 'checkbox'" :field="item.name" :rules="item.rules">
                  <template #label><form-tooltip v-bind="item"></form-tooltip></template>
                  <m-checkbox-group
                    v-model="config.form.data[item.name]"
                    :disabled="config.form?.disabled ?? false"
                    :options="item.options"
                    v-bind="item.others"
                  />
                  <template v-if="item.info" #extra>
                    <form-info :info="item.info"></form-info>
                  </template>
                </m-form-item>
                <!-- date -->
                <m-form-item v-if="item.type === 'date'" :field="item.name" :rules="item.rules">
                  <template #label><form-tooltip v-bind="item"></form-tooltip></template>
                  <m-date-picker
                    v-model="config.form.data[item.name]"
                    default-value=""
                    :placeholder="`请选择${item.label}`"
                    :disabled="config.form?.disabled ?? false"
                    style="width: 100%"
                    v-bind="item.others"
                  />
                  <template v-if="item.info" #extra>
                    <form-info :info="item.info"></form-info>
                  </template>
                </m-form-item>
                <!-- time -->
                <m-form-item v-if="item.type === 'time'" :field="item.name" :rules="item.rules">
                  <template #label><form-tooltip v-bind="item"></form-tooltip></template>
                  <m-time-picker
                    v-model="config.form.data[item.name]"
                    default-value=""
                    :placeholder="`请选择${item.label}`"
                    :disabled="config.form?.disabled ?? false"
                    style="width: 100%"
                    v-bind="item.others"
                  />
                  <template v-if="item.info" #extra>
                    <form-info :info="item.info"></form-info>
                  </template>
                </m-form-item>
                <!-- daterange -->
                <m-form-item v-if="item.type === 'daterange'" :field="item.name" :rules="item.rules">
                  <template #label><form-tooltip v-bind="item"></form-tooltip></template>
                  <m-range-picker
                    v-model="config.form.data[item.name]"
                    :default-value="[]"
                    :placeholder="[`开始${item.label}`, `结束${item.label}`]"
                    :disabled="config.form?.disabled ?? false"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    v-bind="item.others"
                  />
                  <template v-if="item.info" #extra>
                    <form-info :info="item.info"></form-info>
                  </template>
                </m-form-item>
                <!-- upload -->
                <m-form-item v-if="item.type === 'upload'" :field="item.name" :rules="item.rules">
                  <template #label><form-tooltip v-bind="item"></form-tooltip></template>
                  <l-upload-file
                    :config="{
                      disabled: config.form?.disabled ?? false,
                      fileList: config.form.data[item.name],
                      ...item.others,
                    }"
                    @file:change="(fileList) => (config.form.data[item.name] = fileList)"
                  ></l-upload-file>
                  <template v-if="item.info" #extra>
                    <form-info :info="item.info"></form-info>
                  </template>
                </m-form-item>
                <!-- editor -->
                <m-form-item v-if="item.type === 'editor'" :field="item.name" :rules="item.rules">
                  <template #label><form-tooltip v-bind="item"></form-tooltip></template>
                  <l-editor
                    :config="{
                      content: config.form.data[item.name],
                      disabled: config.form?.disabled ?? false,
                      ...item.others,
                    }"
                    @change="(html) => (config.form.data[item.name] = html)"
                  ></l-editor>
                  <template v-if="item.info" #extra>
                    <form-info :info="item.info"></form-info>
                  </template>
                </m-form-item>
                <!-- slot -->
                <m-form-item v-if="item.type === 'slot'" :field="item.name" :rules="item.rules">
                  <template #label><form-tooltip v-bind="item"></form-tooltip></template>
                  <div class="l-h32">
                    <slot :name="item.name ?? ''" :form="config.form" :item="item"></slot>
                  </div>
                  <template v-if="item.info" #extra>
                    <form-info :info="item.info"></form-info>
                  </template>
                </m-form-item>
              </m-col>
            </template>
          </div>
        </div>

        <!-- 底部操作 - 弹出框 & 无弹出框 -->
        <footer
          v-if="!config?.dialog"
          class="footer"
          :class="[config?.dialog ? 'footer-relative' : 'footer-fixed']"
          :style="{textAlign: config?.dialog ? 'right' : 'center'}"
        >
          <m-space :size="4">
            <!-- left -->
            <template v-if="config.form?.operates?.left?.length">
              <m-button
                v-for="item in OPERATES_LEFT"
                :key="item.name"
                class="m-lr4"
                v-bind="item.others"
                @click="() => emits('operate', item.name)"
              >
                {{ item.name }}
              </m-button>
            </template>
            <!-- no-center -->
            <template v-if="!config.form?.operates?.center">
              <m-button v-if="config.form?.operates?.centerShowResetButton" class="m-lr4" @click="() => resetFields()">
                重置
              </m-button>
              <m-button
                v-if="config.form?.operates?.centerShowSubmitButton"
                class="m-lr4"
                type="primary"
                html-type="submit"
              >
                提交
              </m-button>
            </template>
            <!-- center -->
            <template v-if="config.form?.operates?.center?.length">
              <m-button
                v-for="item in OPERATES_CENTER"
                :key="item.name"
                class="m-lr4"
                v-bind="item.others"
                @click="() => emits('operate', item.name)"
              >
                {{ item.name }}
              </m-button>
            </template>
            <!-- right -->
            <template v-if="config.form?.operates?.right?.length">
              <m-button
                v-for="item in OPERATES_RIGHT"
                :key="item.name"
                v-bind="item.others"
                @click="() => emits('operate', item.name)"
              >
                {{ item.name }}
              </m-button>
            </template>
          </m-space>
        </footer>
      </m-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted, onBeforeUnmount} from "vue";
import formInfo from "./form-info.vue";
import formTooltip from "./form-tooltip.vue";
import useStorePermission from "@/store/permission";
import {useMessage} from "@/hooks/useMessage";

const USE_STORE_PERMISSION = useStorePermission();
const props = defineProps<{config: any}>();
const emits = defineEmits(["submit", "operate"]);
const config = reactive(props.config);
const formRef = ref();

/**
 * 左侧按钮组权限节点
 */
const OPERATES_LEFT = computed(() => {
  if (config.form?.operates?.left?.length) {
    return config.form?.operates.left.filter((item: {others: {permission: string}}) => {
      return item.others?.permission ? USE_STORE_PERMISSION.permissions.includes(item.others.permission) : true;
    });
  }
  return [];
});
/**
 * 中间按钮组权限节点
 */
const OPERATES_CENTER = computed(() => {
  if (config.form?.operates?.center?.length) {
    return config.form?.operates.center.filter((item: {others: {permission: string}}) => {
      return item.others?.permission ? USE_STORE_PERMISSION.permissions.includes(item.others.permission) : true;
    });
  }
  return [];
});
/**
 * 右侧按钮组权限节点
 */
const OPERATES_RIGHT = computed(() => {
  if (config.form?.operates?.right?.length) {
    return config.form?.operates.right.filter((item: {others: {permission: string}}) => {
      return item.others?.permission ? USE_STORE_PERMISSION.permissions.includes(item.others.permission) : true;
    });
  }
  return [];
});

/**
 * 设置表单项大小
 */
const getSpan = (size: string) => {
  switch (size) {
    case "mini":
      return config?.dialog ? 12 : 6;
    case "small":
      return config?.dialog ? 16 : 9;
    case "medium":
      return config?.dialog ? 19 : 12;
    case "large":
      return 24;
    default:
      // 处理弹出框和非弹出框默认表单大小
      return config?.dialog ? 16 : 9;
  }
};

/**
 * 提交表单成功
 */
const handleSubmitSuccess = (values: any) => emits("submit", values);

/**
 * 提交表单失败
 */
const handleSubmitFailed = () => {
  const OFFSET_TOP = (document as any).querySelector(".arco-form-item-message")?.offsetTop;
  if (OFFSET_TOP) {
    const FORM_CONTAINER = (document as any).querySelector("#framework-content-scrollbar");
    FORM_CONTAINER.scrollTo({
      top: OFFSET_TOP - 56,
      left: 0,
      behavior: "smooth",
    });
  }
  useMessage().error("请完整填写表单");
};

/**
 * 重置表单
 */
const resetFields = (name?: string) => (name ? formRef.value.resetFields(name) : formRef.value.resetFields());

/**
 * 校验表单
 */
const validate = (name?: string) => (name ? formRef.value.validateField(name) : formRef.value.validate());

/**
 * 滚动底部操作栏样式
 */
const scrollFooterStyle = () => {
  const FOOTER_FIXED: any = document.querySelector(".l-form .footer.footer-fixed");
  if (!FOOTER_FIXED) return;
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 1440) {
      FOOTER_FIXED.style.left = `216px`;
      FOOTER_FIXED.style.marginLeft = `0`;
    } else {
      FOOTER_FIXED.style.left = `50%`;
      FOOTER_FIXED.style.marginLeft = `-504px`;
    }
  });
};

onMounted(() => scrollFooterStyle());
onBeforeUnmount(() => window.removeEventListener("resize", () => false));

defineExpose({resetFields, validate});
</script>

<style lang="scss" scoped>
.l-form {
  h3 {
    margin: 0;
    padding-bottom: 24px;
    font-size: 16px;
    font-weight: 500;
    color: #12141a;
  }
  .section-title {
    padding-left: 12px;
    height: 42px;
    font-size: 15px;
    font-weight: 500;
    color: var(--color-neutral-10);
    line-height: 42px;
    background-color: var(--color-neutral-1);
  }
  .footer-fixed {
    position: fixed;
    width: 1224px;
    height: 56px;
    padding: 0 24px;
    line-height: 56px;
    margin-left: -504px;
    text-align: center;
    bottom: 0;
    left: 50%;
    background-color: #ffffff;
    &.scroll {
      box-shadow: -2px -2px 8px 0px #eeeeee;
    }
  }
}
</style>
