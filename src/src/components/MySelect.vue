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
  props: ['value'],
  data() {
    return {};
  },
  computed: {
    radio: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },
  methods: {}
};
</script>

<style lang="stylus"></style>
