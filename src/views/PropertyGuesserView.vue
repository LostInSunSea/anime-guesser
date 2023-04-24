<template>
  <div class='propertyguesser'>
    <h1>This is a page for guessing properties</h1>
    <div>
      <ais-instant-search index-name='ANI_TEST' :search-client='searchClient'>
        <!-- Widgets -->
        <ais-search-box />
        <ais-hits>
          <template v-slot:item='{ item }'>
            <h2>{{ item.title.english }} / {{ item.title.romaji }} </h2>
          </template>
        </ais-hits>
      </ais-instant-search>
    </div>
  </div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/satellite-min.css';

export default {
  data() {
    return {
      searchClient: algoliasearch('N5M7AHNVDM', 'ca5f2ab855730077f174ab9515bd0c9b'),
    };
  },
};
</script>
