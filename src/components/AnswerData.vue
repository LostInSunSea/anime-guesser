<template>
  <div class="">
    <table class="table is-bordered is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Show</th>
          <th>Year+Season</th>
          <th>Format</th>
          <th>Average Score</th>
          <th>Popularity</th>
          <th>Main Studio</th>
          <th>Genre</th>
          <th>Source</th>
          <th>Main VAs</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="show in answerList" :key="show.id">
          <th>{{ show.title }}</th>
          <td :style="{ background: show.seasonYearColor }">
            {{ show.season + " " + show.seasonYear }}
          </td>
          <td :style="{ background: show.formatColor }">{{ show.format }}</td>
          <td :style="{ background: show.averageScoreColor }">{{ show.averageScore }}</td>
          <td :style="{ background: show.popularityColor }">{{ show.popularity }}</td>
          <td :style="{ background: show.mainStudioColor }">
            {{ show.studios.nodes[0].name }}
          </td>
          <td :style="{ background: show.genresColor }" >{{ show.genres }}</td>
          <td :style='{ background: show.sourceColor }'>{{ show.source }}</td>
          <td :style='{ background: show.voiceActorsColor }'>{{ show.characters.edges }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
.red {
  background-color: red;
}
.yellow {
  background-color: yellow;
}
.green {
  background-color: green;
}
</style>

<script>
export default {
  props: {
    answerList: [],
  },
  methods: {},
};
</script>
