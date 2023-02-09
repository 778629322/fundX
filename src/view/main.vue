<template>
    <div class="main">
        <fundChart></fundChart>
    </div>
</template>
<script setup>
import fundChart from "../components/fundChart.vue";
</script>
<style lang="scss" scoped>
.main {
    display: flex;
    flex-grow: 1;
    min-height: 0;
    border-right: 1px solid #e3e3e3;
}
</style>