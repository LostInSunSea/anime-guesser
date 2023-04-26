<template>
  <div class='about'>
    <ais-instant-search index-name='ANI_TEST' :search-client='searchClient'>
      <!-- Widgets -->
      <ais-configure :hits-per-page.camel='4' :distinct='true' />
      <ais-search-box>
        <template v-slot='{ isSearchStalled, refine }'>
          <!-- eslint-disable -->
          <div class='columns'>
            <div class='column is-four-fifths'>
              <input
                class='text-input'
                type='search'
                v-model='currentRefinement'
                @input='refine($event.currentTarget.value)'
              />
            </div>
            <div class='column'>
              <button @click='debuggerTest()' class='button text-input is-link'>Guess</button>
            </div>
          </div>
          <!-- eslint-enable -->
          <span :hidden='!isSearchStalled'>Loading...</span>
        </template>
      </ais-search-box>
      <ais-hits v-if='hide'>
        <template v-slot:item='{ item }'>
          <div @keydown='fillTextInput(item)' @click='fillTextInput(item)' class='full-width'>
            <div v-if='romaji'>{{ item.title.romaji }}</div>
            <div v-else>{{ item.title.english }}</div>
          </div>
        </template>
      </ais-hits>
    </ais-instant-search>
  </div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/satellite-min.css';

export default {
  props: {
    romaji: Boolean,
  },
  data() {
    return {
      searchClient: algoliasearch('N5M7AHNVDM', 'ca5f2ab855730077f174ab9515bd0c9b'),
      currentRefinement: '',
      selection: {},
      hide: false,
    };
  },
  watch: {
    // see when the text input box changes
    currentRefinement() {
      if (this.currentRefinement === '') {
        this.hide = false;
      } else {
        this.hide = true;
      }
    },
  },
  methods: {
    fillTextInput(data) {
      if (this.romaji) {
        this.currentRefinement = data.title.romaji;
      } else {
        this.currentRefinement = data.title.english;
      }
      this.selection = data;
    },
    debuggerTest() {
      console.log(this.selection);
    },
  },
};
</script>

<style scoped>
.full-width {
  width: 100%;
  height: 100%;
  padding: 1rem;
}
.text-input {
  width: 100%;
  height: 2rem;
  padding: 0.5rem;
}
.columns {
  margin: 0;
  padding-bottom: 0;
}
</style>
