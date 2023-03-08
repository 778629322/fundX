<template>
  <header>
    <!-- <div className="marketList">

        </div> -->
    <!-- <div class="headR">
          <div className="search">
            <div className="tab">
              <div class="cur">
                {{ tagOptions.label }}
              </div>
              <div class="list">
                <div class="item" @click="tagOptions.value = item.value; tagOptions.label = item.label"
                  v-for="item in tagOptions.list" :key="item.value">{{ item.label }}</div>
              </div>
            </div>
            <input type="text" @keyup.enter="queryFundInfo" v-model="fundModel" />
          </div>
          <div class="fundInfo" @click="queryFundHistory">
            <p class="fund_name">{{ queryinfo?.name }}</p>
            <div class="data">
              <p class="netVal">{{ queryinfo?.net }}</p>
              <p class="chg">{{ queryinfo?.rate }}</p>
            </div>
          </div>
        </div> -->
  </header>
<RouterView />
</template>

<script setup>
import { defineComponent, useCssModule, reactive, ref } from "vue";
import * as api from "../script/api";
import { fundHistory, fundInfo } from "../script/store";

import { find } from "lodash";

const fundModel = ref();

let queryinfo = ref();

const tagOptions = ref({
  value: 0,
  label: "基金",
  list: [
    {
      value: 0,
      label: "基金",
    },
    {
      value: 1,
      label: "股票",
    },
    {
      value: 2,
      label: "黄金",
    },
  ],
});

const queryFundInfo = async () => {
  const code = fundModel.value;
  const data = await api.getFuzzyList(code);
  console.log(data)
  // const data = await fundInfo.getData({ code });
  // queryinfo.value = find(data, { code });
};

// const queryFund = async () => {
//   const code = fundModel.value;
//   const data = await api.getFundInfo(code);
// };

const queryFundHistory = async () => {
  const { code } = queryinfo.value;
  fundHistory.getData({ code });
};
</script>
<style lang="scss" scoped>
header {
  height: 150px;
  display: flex;
  flex-shrink: 0;
  // align-items: center;
  border-bottom: 1px solid #e3e3e3;
}
</style>
