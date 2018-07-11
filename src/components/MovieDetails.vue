<template>
  <div class="movie-details" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="hero">
      <div class="banner">
        <img :src="assetPath(movie.backdrop_path, 500)" alt="">
      </div>
      <div class="information">
        <h3 class="movie-title">{{movie.original_title}}</h3>
        <h4 class="movie-tagline">{{movie.tagline}}</h4>
        <el-tag v-for="genre in movie.genres" :key="genre.id" size="mini" type="info">{{genre.name}}</el-tag>
        <p class="movie-overview">{{movie.overview}}</p>
      </div>
    </div>
    <div class="detail-information">
      <h3 class="block-header">Top Billed Cast</h3>
      <div class="cast">
        <el-row :gutter="20">
          <el-col :span="4" v-for="(cast, index) in casts.slice(0, 6)" :key="index">
            <el-card :body-style="{ padding: '0px' }">
              <div class="cast-avatar">
                <img :src="assetPath(cast.profile_path, 200)">
              </div>
              <div class="cast-info">
                <p class="cast-name">{{ cast.name }}</p>
                <p class="cast-character">{{cast.character}}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <h3 class="block-header">More Fatcs</h3>
          <el-row :gutter="20">
            <el-col :span="12">
              <p>
                <strong>Runtime:</strong>
                {{ movie.runtime }} mins
              </p>
              <p>
                <strong>Budget:</strong>
                ${{ formatPrice(movie.budget) }}
              </p>
            </el-col>
            <el-col :span="12">
              <p>
                <strong>Release Date:</strong>
                {{ movie.release_date }}
              </p>
              <p>
                <strong>Revenue:</strong>
                ${{ formatPrice(movie.revenue) }}
              </p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <h3 class="block-header">Producers</h3>
          <el-row :gutter="20">
            <el-col :span="6" v-for="(producer, index) in production_companies.slice(0, 6)" :key="index">
              <div class="producer-avatar" v-if="producer.logo_path">
              <img :src="assetPath(producer.logo_path, 200)">
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <br><br>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data () {
    return {
      movie_id: this.$route.params.id,
      movie: {},
      casts: [],
      production_companies: [],
      fullscreenLoading: true
    }
  },
  created () {
    this.fetchData(this.movie_id)
  },
  methods: {
    fetchData: function(id) {
      let self = this
      fetch("https://api.themoviedb.org/3/movie/"+ id + "?api_key=d993bdf37f8ab7c574c990434a85a69f&append_to_response=credits").then(function (response) {
        return response.json()
      }).then(function (result) {
        self.movie = result
        self.production_companies = result.production_companies
        self.casts = result.credits.cast
        self.fullscreenLoading = false;
      })
    },
    assetPath: function(raw_path, width) {
      return "http://image.tmdb.org/t/p/w" + width + raw_path
    },
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  }
}
</script>

<style>
.hero {
  display: grid;
  grid-template-columns: 500px 1fr;
}
.banner img {
  width: 100%;
  border-radius: 0.325em;
}
.information {
  padding-left: 2em;
}
.information .movie-title {
  margin: 0;
  font-size: 22px;
}
.information .movie-tagline {
  margin: 0 0 1em 0;
  font-size: 16px;
  color: #8395a7;
  font-weight: 400;
}
.information .movie-overview {
  margin-top: 2em;
  font-size: 14px;
}
.el-tag {
  margin-right: 0.5em;
}
.cast-avatar,
.producer-avatar {
  width: 100%;
  position: relative;
}
.cast-avatar:before,
.producer-avatar:before {
  content: "";
  display: block;
  padding-bottom: 100%;
}
.cast-avatar img,
.producer-avatar img {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  object-fit: cover;
}
.producer-avatar img {
  object-fit: contain;
}
.cast-info, .producer-info {
  padding: 0.5em 1em;
  font-size: 12px;
}
.cast-info p,
.producer-info p {
  margin: 0;
}
.cast-name,
.producer-name {
  font-weight: bold;
}
.cast-character {
  font-size: 11px;
}
.block-header {
  position: relative;
  margin-bottom: 2em;
}
.block-header:after {
  content: "";
  width: 40px;
  height: 2px;
  background: #0abde3;
  position: absolute;
  bottom: -10px;
  left: 0;
}
</style>
