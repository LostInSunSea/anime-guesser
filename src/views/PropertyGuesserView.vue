<template>
  <div class='propertyguesser container'>
    <div class='columns'>
      <div class='column is-flex is-justify-content-end'>
        <o-field grouped group-multiline>
          <o-switch v-model='romaji'>
            <div v-if='romaji'>Romaji</div>
            <div v-else>English</div>
          </o-switch>
        </o-field>
      </div>
    </div>
    <AnswerData v-bind:answerList='answerList' />
    <AutoSearch v-bind:romaji='romaji' @submit-guess='checkAnswer' />
    <div class='lives'>
      <h1>Guesses Remaining: {{ livesRemaining }}/{{ livesTotal }}</h1>
    </div>
  </div>
</template>
<style lang='scss'>
.lives {
  margin-top: 1rem;
  text-align: center;
}
</style>
<script>
import AutoSearch from '@/components/AutoSearch.vue';
import AnswerData from '@/components/AnswerData.vue';
import { ref } from 'vue';

export default {
  name: 'PropertyGuesserView',
  setup() {
    const romaji = ref(false);
    return {
      romaji,
    };
  },
  components: {
    AutoSearch,
    AnswerData,
  },
  data() {
    return {
      livesRemaining: 6,
      livesTotal: 6,
      answerList: [],
      solution: null,
    };
  },
  mounted() {
    this.getAnswer();
  },
  methods: {
    async checkAnswer(selection) {
      console.log('sel', selection);
      // if nothing selected do nothing
      if (!selection || selection === 'undefined') {
        return;
      }
      // if answer is selected get more info from anilist
      const animePromise = await this.getAniListData(selection.objectID);
      const animeInfo = animePromise.data.Media;
      console.log('answer', this.solution);
      // compare the answer to the selection
      if (animeInfo.id === this.solution.objectID) {
        console.log('correct');
      } else {
        console.log('wrong');
        // check game over
        this.livesRemaining -= 1;
        if (this.livesRemaining <= 0) {
          console.log('game over');
        }
        /**
         * Binary checks
         */
        // check if year is the same
        if (animeInfo.seasonYear === this.solution.seasonYear) {
          animeInfo.seasonYearColor = 'yellow';
          if (animeInfo.season === this.solution.season) {
            animeInfo.seasonColor = 'green';
          }
        } else {
          animeInfo.seasonYearColor = 'red';
        }
        // check main studio
        console.log(
          'studios',
          animeInfo.studios.nodes[0].name,
          this.solution.studios.nodes[0].name,
        );
        if (animeInfo.studios.nodes[0].name === this.solution.studios.nodes[0].name) {
          animeInfo.mainStudioColor = 'green';
        } else {
          animeInfo.mainStudioColor = 'red';
        }
        // check source
        if (animeInfo.source === this.solution.source) {
          animeInfo.sourceColor = 'green';
        } else {
          animeInfo.sourceColor = 'red';
        }
        // check format
        if (animeInfo.format === this.solution.format) {
          animeInfo.formatColor = 'green';
        } else {
          animeInfo.formatColor = 'red';
        }
        /**
         * Number Checks
         */
        // check popularity
        if (animeInfo.popularity === this.solution.popularity) {
          animeInfo.popularityColor = 'green';
        } else {
          if (animeInfo.popularity > this.solution.popularity) {
            animeInfo.state = 'higher';
          } else {
            animeInfo.state = 'lower';
          }
          animeInfo.popularityColor = 'red';
        }
        // check avg score
        if (animeInfo.averageScore === this.solution.averageScore) {
          animeInfo.averageScoreColor = 'green';
        } else {
          if (animeInfo.averageScore > this.solution.averageScore) {
            animeInfo.state = 'higher';
          } else {
            animeInfo.state = 'lower';
          }
          animeInfo.averageScoreColor = 'red';
        }
        /**
         * Array checks
         */
        // check genres
        let wrongGenres = 0;
        let correctGenres = 0;
        for (let i = 0; i < animeInfo.genres.length; i++) {
          if (!this.solution.genres.includes(animeInfo.genres[i])) {
            wrongGenres++;
          } else {
            correctGenres++;
          }
        }
        if (wrongGenres === 0) {
          if (animeInfo.genres.length === this.solution.genres.length) {
            animeInfo.genresColor = 'green';
          } else {
            animeInfo.genresColor = 'yellow';
          }
        } else {
          if (correctGenres > 0) {
            animeInfo.genresColor = 'yellow';
          } else {
            animeInfo.genresColor = 'red';
          }
        }
        // check voice actors
        let wrongVoiceActors = 0;
        console.log(animeInfo.characters.edges);
        console.log(this.solution.characters.edges);
        for (let i = 0; i < animeInfo.characters.edges.length; i++) {
          // go through solution character edges and compare to animeInfo
          for (let j = 0; j < this.solution.characters.edges.length; j++) {
            if (
              animeInfo.characters.edges[i].voiceActors[0].name.full
              !== this.solution.characters.edges[j].voiceActors[0].name.full
            ) {
              wrongVoiceActors++;
            }
          }
        }
        if (wrongVoiceActors === 0) {
          if (animeInfo.characters.edges.length === this.solution.characters.edges.length) {
            animeInfo.charactersColor = 'green';
          } else {
            animeInfo.charactersColor = 'yellow';
          }
        } else {
          animeInfo.charactersColor = 'red';
        }
        // push to answerlist with colors
        console.log('info', animeInfo);
        if (this.answerList.length === 0) {
          this.answerList[0] = animeInfo;
        } else {
          this.answerList.push(animeInfo);
        }
      }
    },
    async getAnswer() {
      const solutionId = 108511;
      // go into the database and get the answer data
      this.getAniListData(solutionId);
      const solutionInfo = await this.getAniListData(solutionId);
      this.solution = solutionInfo.data.Media;
      this.solution.objectID = 108511;
    },
    async getAniListData(answerId) {
      const animeInfo = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
          query ($id: Int) {
            Media (id: $id, type: ANIME isAdult: false popularity_greater:1000) {
              id
              title {
                  romaji
                  english
                  native
              }
              format
              averageScore
              season
              seasonYear
              source
              genres
              countryOfOrigin
              popularity
              studios (isMain:true){
                nodes{name}
              }
              characters(sort:FAVOURITES_DESC, perPage:5){
                  edges{
                    node{
                        name{
                            full
                        }
                    }
                    voiceActors(language:JAPANESE){
                        name{full}
                    }
                  }
              }
            }
          }`,
          variables: {
            id: answerId,
          },
        }),
      }).then((res) => res.json());
      return animeInfo;
    },
  },
};
</script>
