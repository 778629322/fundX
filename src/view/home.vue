<template>
    <div class="container">
        <Main></Main>
        <Right></Right>
    </div>
</template>
<script setup>
import Main from "./main.vue";
import Right from "./right.vue";
</script>
<style lang="scss" scoped>
.container {
    display: flex;
    flex-grow: 1;
}
</style>
