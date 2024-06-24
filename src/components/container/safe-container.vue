<script setup lang="ts">
import { defineCssNamespace } from '@/utils/define-css-namespace'

interface Props {
  extraStyle?: Record<string, string>
  extraClass?: string
}
withDefaults(defineProps<Props>(), {
  extraStyle: () => ({}),
  extraClass: '',
})

const ns = defineCssNamespace('safe-container')
</script>

<script lang="ts">
export default {
  inheritAttrs: true,
}
</script>

<template>
  <view :class="[ns.cls, extraClass]" :style="{ ...extraStyle }">
    <slot />
  </view>
</template>

<style lang="scss">
@use '@/assets/scss/lib.scss' as *;

@include b('safe-container') {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
