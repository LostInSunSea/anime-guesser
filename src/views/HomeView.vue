<template>
  <div class="container">
    <div class="columns is-desktop">
      <div class="column">
        <div class="box has-text-centered">
          <h2 class="is-size-2">Daily</h2>
          <router-link to="/dailyImages" class="">
            <button class="button is-primary are-medium selector is-fullwidth">Images</button>
          </router-link>
          <br />
          <router-link to="/dailyGuess" class="">
            <button class="button is-primary are-medium selector is-fullwidth">Properties</button>
          </router-link>
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
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
