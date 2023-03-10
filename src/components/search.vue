<!--  -->
<template>
  <div class="search" ref="search">
    <div class="list" v-show="visibility">
      <div class="item" v-for="item in list">
        <span class="name">{{ item.name }}</span>
        <span class="code">{{ item.code }}</span>
      </div>
    </div>
    <input type="text" v-model="fundModel" @focus="searchFocus" />
  </div>
</template>

<script setup>
import { defineComponent, useCssModule, reactive, ref } from "vue";
import _ from "lodash";
import { asyncComputed, useDebounce, onClickOutside } from "@vueuse/core";
import * as api from "../script/api";

const fundModel = ref("");
const debounced = useDebounce(fundModel, 400)
const visibility = ref(false)

const list = asyncComputed(async () => {
  const result = []
  if (debounced.value == "") return result;
  const [Astock, HKstock, fund, stock] = await api.getFuzzyList(debounced.value);
  fund.forEach(({ name, code }) => {
    result.push({
      code,
      name,
      type: "fund"
    })
  })
  Astock.forEach(({ code, name }) => {
    result.push({
      code,
      name,
      type: "stock"
    })
  });
  HKstock.forEach(({ name, thscode }) => {
    result.push({
      code: thscode,
      name,
      type: "stock"
    })
  })
  stock.forEach(({ name, code }) => {
    result.push({
      code,
      name,
      type: "stock"
    })
  })
  visibility.value = true;
  return _.sortedUniq(result)
}, null)

const search = ref(null);
onClickOutside(search, (event) => {
  visibility.value = false;
})

const searchFocus = () => {
  if (debounced.value) {
    visibility.value = true;
  }
}



</script>
<style lang='scss' scoped>
.search {
  display: flex;
  flex-shrink: 0;
  position: relative;
  height: 30px;
  border-top: 1px solid #e3e3e3;

  .list {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    bottom: 31px;
    line-height: 30px;
    border-top: 1px solid #e3e3e3;

    .item {
      display: flex;
      flex-grow: 1;
      justify-content: space-between;
      cursor: pointer;
      padding: 0 5px;

      &:hover {
        background: #e3e3e3;
      }
    }
  }

  input {
    display: flex;
    flex-grow: 1;
    border: none;
    outline: none;
    padding: 0 5px;
  }
}
</style>