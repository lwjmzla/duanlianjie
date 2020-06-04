<template>
  <div>
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="a"></el-checkbox>
      <el-checkbox label="b"></el-checkbox>
      <el-checkbox label="c"></el-checkbox>
    </el-checkbox-group>
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
    checkList: {
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
