<template>
  <div class="right">
    <div class="item" v-for="item in fundInfo.list" :key="item.code" @click="queryFundHistory(item.code)">
      <span>{{ item.name }}</span>
      <span>{{ item.rate }}</span>
    </div>
  </div>
</template>
<script setup>
import { defineComponent, useCssModule, reactive, ref } from "vue";
import { fundHistory, fundInfo } from "../script/store";

const queryFundHistory = async (code) => {
  fundHistory.getData({ code });
};
</script>
<style lang="scss" scoped>
.right {
  display: flex;
  width: 254px;
  min-height: 0;
  flex-direction: column;
  .item {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    align-items: center;
    height: 30px;
    padding: 0 10px;
    cursor: pointer;
    border-bottom: 1px solid #dedede;
  }
}
</style>