<template>
  <div class="app"><Main /></div>
</template>

<script lang="ts">
import Vue from "vue";
import Main from "./layouts/Main.vue";

export default Vue.extend({
  name: "App",
  components: {
    Main,
  },
});
</script>

<style></style>
