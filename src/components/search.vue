<!--  -->
<template>
  <div class="search">
    <input type="text" @keydown="queryFundInfo" v-model="fundModel" />
  </div>
</template>

<script setup>
import { defineComponent, useCssModule, reactive, ref } from "vue";
import * as api from "../script/api";
const fundModel = ref();
// 股票、港股、基金、美股、英股

const queryFundInfo = async () => {
  const res = await api.getFuzzyList(fundModel.value)
}

</script>
<style lang='scss' scoped>
.search {
  display: flex;
  flex-shrink: 0;
  position: relative;
  height: 30px;
  border-top: 1px solid #e3e3e3;

  input {
    display: flex;
    flex-grow: 1;
    border: none;
    outline: none;
  }
}
</style>