<template>
  <div class='propertyguesser container'>
    <div class='columns'>
      <div class='column'>
        <h1>Guess What Anime It Is?</h1>
      </div>
      <div class='column is-flex is-justify-content-end'>
        <o-field grouped group-multiline>
          <o-switch v-model='romaji'>
            <div v-if="romaji">Romaji</div>
            <div v-else>English</div>
          </o-switch>
        </o-field>
      </div>
    </div>
    <AutoSearch v-bind:romaji="romaji" />
  </div>
</template>

<script lang="ts">
import AutoSearch from '@/components/AutoSearch.vue';
import { ref } from 'vue';

export default {
  setup() {
    const romaji = ref(false);
    return {
      romaji,
    };
  },
  components: {
    AutoSearch,
  },
  data() {
    return {};
  },
};
</script>
