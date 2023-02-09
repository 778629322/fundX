<template>
    <v-chart class="chart" :option="option" ref="charts" />
</template>
<script setup>
import {
    defineComponent,
    useCssModule,
    reactive,
    ref,
    watch,
    watchPostEffect,
} from "vue";
import { fund } from "../script/store";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import dayjs from "dayjs";
import {
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    DataZoomComponent,
    LegendComponent,
} from "echarts/components";
import VChart from "vue-echarts";

import { useWindowSize } from "@vueuse/core";
const { width, height } = useWindowSize();

const charts = ref();

use([
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    DataZoomComponent,
    LegendComponent,
    CanvasRenderer,
    LineChart,
]);

const weekTxt = {
    0: "周日",
    1: "周一",
    2: "周二",
    3: "周三",
    4: "周四",
    5: "周五",
    6: "周六",
};

const color = [
    "#1890FF",
    "#13C2C2",
    "#2FC25B",
    "#FACC14",
    "#F04864",
    "#8543E0",
    "#3436C7",
    "#223273",
];

const initWeeks = () =>
    Array.from({ length: 7 }, (item, i) => ({
        name: weekTxt[i],
        type: "line",
        symbolSize: 3,
        symbol: "circle",
        sampling: "lttb",
        itemStyle: {
            color: color[i],
        },
        lineStyle: {
            width: 1,
            color: color[i],
        },
        data: [],
    }));

const option = ref({
    tooltip: {
        trigger: "axis",
    },
    legend: {
        top: "10",
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    xAxis: {
        type: "time",
        axisLabel: {
            color: "#333",
            formatter: "{yyyy}/{MM}/{dd}",
        },
        splitLine: {
            show: true,
        },
        axisLine: {
            lineStyle: {
                color: "#e0e6f1",
            },
        },
    },
    yAxis: {
        min: "dataMin",
        max: "dataMax",
        axisLabel: {
            color: "#333",
            formatter: (value) => value.toFixed(2),
        },
    },
    toolbox: {
        show: false,
        feature: {
            dataZoom: {
                yAxisIndex: "none",
            },
        },
    },
    dataZoom: [
        {
            start: 85,
            show: false, // 是否显示
        },
        {
            type: "inside",
        },
    ],
    series: [],
});

watchPostEffect(async (value) => {
    const weeks = initWeeks();
    fund.data.map(([date, net], index) => {
        const getDay = dayjs(date, "YYYYMMDD").day();
        const curWeek = weeks[getDay];
        const days = dayjs(date, "YYYYMMDD").format("YYYY/MM/DD");
        curWeek.data.push([days, +net]);
    });

    option.value.series = weeks;
});

watch([width, height], () => {
    charts.value.resize();
});
</script>
<style lang="scss" scoped></style>