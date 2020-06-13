<template>
  <v-app>
    <v-content>
      <game></game>
    </v-content>
  </v-app>
</template>

<script>
import Game from "./components/game.vue";

export default {
  name: "App",

  components: {
    Game
  },

  data: () => ({
    //
  })
};
</script>
<style scoped>
.border-bottom {
  border-bottom: 1px solid black;
}
</style>
