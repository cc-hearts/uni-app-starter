<template>
  <view :class="[ns.cls, extraClass]" :style="{ ...extraStyle }">
    <slot />
  </view>
</template>

<script setup lang="ts">
import { defineCssNamespace } from '@/utils/define-css-namespace'

interface Props {
  extraStyle?: Record<string, string>
  extraClass?: string
}
const ns = defineCssNamespace('safe-container')

withDefaults(defineProps<Props>(), {
  extraStyle: () => ({}),
  extraClass: '',
})
</script>

<script lang="ts">
export default {
  inheritAttrs: true,
}
</script>

<style lang="scss">
@use '@/assets/scss/lib.scss' as *;

@include b('safe-container') {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
