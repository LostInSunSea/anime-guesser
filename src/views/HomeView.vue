<template>
  <div class="container">
    <div class="columns is-desktop">
      <div class="column">
        <div class="box has-text-centered">
          <h2 class="is-size-2">Daily</h2>
          <router-link to="/dailyImages" class="">Images</router-link>
          <br />
          <router-link to="/dailyGuess" class="">Guess</router-link>
        </div>
      </div>
      <div class="column">
        <div class="box has-text-centered">
          <h2 class="is-size-2">Free Play</h2>
          <router-link to="" class="">Coming Soon</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
  },
})
export default class HomeView extends Vue { }
</script>
<style>
.selector {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
