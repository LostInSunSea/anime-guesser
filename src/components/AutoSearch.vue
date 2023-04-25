<template>
  <div class='about'>
    <ais-instant-search index-name='ANI_TEST' :search-client='searchClient'>
      <!-- Widgets -->
      <ais-configure :hits-per-page.camel='4' :distinct='true' />
      <!--<ais-search-box placeholder='Enter your Anime Guess' />-->
      <ais-search-box>
        <template v-slot='{ currentRefinement, isSearchStalled, refine }'>
          <!-- eslint-disable -->
          <input
            type='search'
            :value='currentRefinement'
            @input='refine($event.currentTarget.value)'
          />
          <!-- eslint-enable -->
          <span :hidden='!isSearchStalled'>Loading...</span>
        </template>
      </ais-search-box>
      <ais-hits>
        <template v-slot:item='{ item }'>
          <div @keydown='fillTextInput(item)' @click='fillTextInput(item)'>
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
    };
  },
  methods: {
    fillTextInput(data) {
      console.log(data);
    },
  },
};
</script>
