<template>
  <el-card :body-style="{ padding: '0px' }">
    <div class="poster">
      <img :src="assetPath(movie.poster_path)" class="poster-image">
    </div>

    <div class="movie-detail">
      <div class="movie-title">
        <span>{{ movie.title | truncate(30) }}</span>
      </div>

      <div class="movie-rating">
        <el-progress type="circle"
                      :percentage="movie.vote_average * 10"
                      :width=30
                      :stroke-width=3
                      :show-text=false
                      :color="ratingColor(movie.vote_average)"
                      class="rating-indicator">
        </el-progress>
        <span class="rating-number">{{ movie.vote_average }}</span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  props: ["movie"],
  methods: {
    ratingColor: function(average) {
      return average <= 6 ? "#ff6b6b" : "#1dd1a1"
    },
    assetPath: function(raw_path) {
      return 'http://image.tmdb.org/t/p/w185' + raw_path
    }
  }
}
</script>

<style>
.el-card {
  border-radius: 0.5em;
  margin-bottom: 40px;
}
.poster {
  width: 100%;
  position: relative;
  border-bottom: 1px solid #f2f2f2;
}
.poster:after {
  content: "";
  display: block;
  padding-top: 145%;
}
.poster .poster-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.movie-detail {
  padding: 1em;
  display: grid;
  grid-template-columns: 1fr 36px;
  height: 40px;
}
.movie-detail .movie-title {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  color: #576574;
}
.movie-detail .movie-rating {
  text-align: right;
  position: relative;
}
.movie-detail .movie-rating .rating-indicator {
  margin-top: 6px;
}
.movie-detail .movie-rating .rating-number {
  font-size: 11px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(calc(-50% + 3px), -50%)
}
</style>
