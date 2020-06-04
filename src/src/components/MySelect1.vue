<template>
  <div>
    <el-radio-group v-model="radio">
      <el-radio :label="0">男</el-radio>
      <el-radio :label="1">女</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  props: ['checked'],
  model: {
    prop: 'checked',
    event: 'change'
  },
  data() {
    return {};
  },
  computed: {
    radio: {
      get() {
        return this.checked;
      },
      set(value) {
        this.$emit('change', value);
      }
    }
  },
  methods: {}
};
</script>

<style lang="stylus"></style>
