<template>
  <div class="icon" :class="[`icon--${name}`, `icon--${size}`, { 'has-align-fix': fixAlign }]">
    <img :src="require(`../../assets/icons/${name}.svg`)" :alt="`${name}`" />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'normal',
    },
    modifier: {
      type: Object,
      default: null,
    },
    fixAlign: {
      type: Boolean,
      default: false,
    },
  },
  // created: function() {}
}
</script>

<style lang="scss" scoped>
.icon {
  position: relative;
  width: 100%;
  height: 100%;

  &.has-align-fix {
    top: -.1rem;
  }
}

</style>
