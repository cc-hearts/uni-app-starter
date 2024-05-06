<template>
  <view :class="ns.cls">
    <uni-forms ref="uniFormsRef" :model-value="formData">
      <uni-forms-item
        v-for="item in props.schema"
        :key="item.field"
        :type="item.type"
        :name="item.field"
        :class="[item.labelPosition === 'top' ? ns.e('label-position') : '']"
        :label="item.label"
        :required="item.required"
      >
        <template #label>
          <view class="flex items-center">
            <text class="color-#666666">
              {{ item.label }}
            </text>
          </view>
        </template>

        <slot v-if="item.slot" name="custom" :form-data="formData" :item="item" :slot-name="item.slot.name" />

        <uni-easyinput
          v-else-if="item.type === 'input'"
          v-model="formData[item.field]"
          :disabled="item.disabled"
          v-bind="item.extraProperty || {}"
        />
      </uni-forms-item>
    </uni-forms>
  </view>
</template>

<script setup lang="ts">
import { defineCssNamespace } from '@/utils/define-css-namespace'
import { isFn, isNull, isUndef } from '@cc-heart/utils'
import { computed, onMounted, ref, unref } from 'vue'

interface Columns {
  field: string
  type: string
  label: string
  slot?: { name: string }
  required?: boolean
  disabled?: boolean
  labelPosition?: 'top' | 'left' | string
  extraProperty?: Record<PropertyKey, unknown>
}

interface Props {
  schema: Columns[]
  initFormData?: (formData: Record<PropertyKey, unknown>) => Record<PropertyKey, unknown>
}
const props = withDefaults(defineProps<Props>(), {
  initFormData: () => ({}),
})

const ns = defineCssNamespace('form-schema')

const formData = ref<Record<PropertyKey, unknown>>({})
onMounted(() => {
  if (isFn(props.initFormData)) {
    props.initFormData(unref(formData))
  }
})

const requiredRules = computed(() => {
  return props.schema
    .filter((item) => item.required)
    .map((item) => ({
      required: true,
      message: `${item.label} 不能为空`,
      field: item.field,
    }))
})

const setFieldsValue = (updatedFieldsValue: Record<string, unknown>) => {
  formData.value = {
    ...formData.value,
    ...updatedFieldsValue,
  }
}

const getFieldsValue = () => {
  return { ...formData.value }
}

const uniFormsRef = ref()
const validFormData = async () => {
  return new Promise((resolve, rej) => {
    uniFormsRef.value?.validate((err, formData) => {
      if (err) {
        console.log(err)
        rej(err)
        return
      }
      const message = requiredRules.value.reduce((acc, cur) => {
        if (acc) return acc
        if (isUndef(formData[cur.field]) || isNull(formData[cur.field])) {
          return cur.message
        }
        return acc
      }, '')

      if (message) {
        rej(message)
        return
      }
      resolve(formData)
    })
  })
}

defineExpose({
  setFieldsValue,
  validFormData,
  getFieldsValue,
})
</script>

<style lang="scss">
@use '@/assets/scss/lib.scss' as *;
</style>
