<template>
  <div class="movies_list" v-loading.fullscreen.lock="fullscreenLoading">
      <el-row :gutter="40">
        <el-col :span="6" v-for="(movie, index) in movies" :key="index">
          <router-link :to="{ name: 'MovieDetails', params: { id: movie.id }}" >
            <movie-card :movie="movie"/>
          </router-link>
        </el-col>
      </el-row>
      <el-pagination
        @current-change="fetchNewPage"
        background
        layout="prev, pager, next"
        :total="100">
      </el-pagination>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard'
export default {
  name: 'Movies',
  data () {
    return {
      fullscreenLoading: true,
      movies: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData: function(page) {
      let self = this
      fetch('https://api.themoviedb.org/3/discover/movie?api_key=d993bdf37f8ab7c574c990434a85a69f&sort_by=popularity.desc&page=' + page).then(function (response) {
        return response.json()
      }).then(function (result) {
        self.movies = result.results
        self.fullscreenLoading = false
        self.scrollToTop(100)
      })
    },
    fetchNewPage: function(page) {
      this.fetchData(page)
    },
    scrollToTop: function(scrollDuration) {
      var cosParameter = window.scrollY / 2,
        scrollCount = 0,
        oldTimestamp = performance.now();
      function step (newTimestamp) {
        scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
        if (scrollCount >= Math.PI) window.scrollTo(0, 0);
        if (window.scrollY === 0) return;
        window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    }
  },
  components: {
    "movie-card": MovieCard
  }
}
</script>

<style>
.el-pagination {
  border-top: 1px solid #f2f2f2;
  padding: 2em 0;
  margin: 1em -5px;
}
a {
  text-decoration: none;
}
</style>