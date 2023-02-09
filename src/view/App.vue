<template>
    <header>
        <div className="marketList">

        </div>
        <div class="headR">
            <div className="search">
                <div className="tab">
                    <div class="cur">
                        {{ tagOptions.label }}
                    </div>
                    <div class="list">
                        <div class="item" @click="tagOptions.value=item.value;tagOptions.label=item.label" v-for="item in tagOptions.list" :key="item.value">{{ item.label }}</div>
                    </div>
                </div>
                <input type="text" @keyup.enter="queryFund" v-model="fundModel" />
            </div>
            <div class="fundInfo" @click="queryFundData">
                <p class="fund_name">{{ queryinfo?.name }}</p>
                <div class="data">
                    <p class="netVal">{{ queryinfo?.net }}</p>
                    <p class="chg">{{ queryinfo?.rate }}</p>
                </div>
            </div>
        </div>
    </header>
    <RouterView />
</template>

<script setup>
import { defineComponent, useCssModule, reactive, ref } from "vue";
import * as api from "../script/api";
import { fund } from "../script/store";

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

const queryFund = async () => {
    const code = fundModel.value;
    const data = await api.getFundInfo(code);
    queryinfo.value = find(data, { code });
};

const queryFundData = async () => {
    const { code, name, enddate } = queryinfo.value;
    fund.getData({ code, name, enddate });
};
</script>
<style lang="scss" scoped>
header {
    height: 150px;
    display: flex;
    justify-content: space-between;
    // align-items: center;
    border-bottom: 1px solid #e3e3e3;
    .marketList {
        display: flex;
        flex-grow: 1;
        border-right: 1px solid #e3e3e3;
    }
    .headR {
        display: flex;
        flex-direction: column;
        .search {
            display: flex;
            justify-content: space-between;
            height: 35px;
            border-bottom: 1px solid #e3e3e3;
            // border-radius: 5px;
            overflow: hidden;
            .tab {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50px;
                .cur {
                    color: #4a4a4a;
                }
                .list {
                    position: absolute;
                    display: none;
                }
            }
            input {
                border: none;
                outline: none;
                width: 200px;
                color: #4a4a4a;
            }
        }
        .fundInfo {
            display: flex;
            flex-direction: column;
            padding: 10px;
            flex-grow: 1;
            .fund_name {
                color: #333333;
                font-size: 16px;
                padding-bottom: 10px;
            }
            .data {
                display: flex;
                justify-content: space-between;
            }
        }
    }
}
</style>
