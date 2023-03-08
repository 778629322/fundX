<template>
  <div class="right">
    <div class="tab"></div>
    <div class="list">
      <div class="item" v-for="item in fundInfo.list" :key="item.code" @click="queryFundHistory(item)">
        <span>{{ item.name }}</span>
        <span>{{ item.rate }}</span>
      </div>
    </div>
    <search />
</div>
</template>
<script setup>
import { defineComponent, useCssModule, reactive, ref } from "vue";
import { fundHistory, fundInfo } from "../script/store";
import search from "../components/search.vue";
import dayjs from "dayjs";

const queryFundHistory = async (item) => {
  const { enddate } = item;
  const nowdate = dayjs().format("YYYY-MM-DD");
  if (enddate == nowdate) {
    fundHistory.getData({ code: item.code });
  } else {
    fundInfo.getData({ code: item.code }, { upCache: true });
    fundHistory.getData({ code: item.code }, { upCache: true });
  }
};
</script>
<style lang="scss" scoped>
.right {
  display: flex;
  width: 254px;
  flex-direction: column;

  .list {
    display: flex;
    flex-grow: 1;
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

}
</style>