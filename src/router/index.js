import Vue from 'vue'
import Router from 'vue-router'
import Movies from '@/components/Movies'
import MovieDetails from '@/components/MovieDetails'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Movies',
      component: Movies
    },
    {
      path: '/movie/:id/details',
      name: 'MovieDetails',
      component: MovieDetails,
      props: true
    }
  ]
})
