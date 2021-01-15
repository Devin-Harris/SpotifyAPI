import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import Fragments from '../views/Fragments'
import SuspenseInfo from '../views/Suspense-info'
import SpotifyApi from '../views/Spotify-api'
import TrackInfo from '../views/track-info'
import ArtistInfo from '../views/artist-info'
import CreatePlaylist from '../views/create-playlist'
import PlaylistSplitter from '../views/playlist-splitter'
import PlaylistCombiner from '../views/playlist-combiner'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: SpotifyApi
  },
  {
    path: '/fragments',
    name: 'Fragments',
    component: Fragments
  },
  {
    path: '/suspense',
    name: 'Suspense-info',
    component: SuspenseInfo
  },
  {
    path: '/spotify-api',
    name: 'Spotify-api',
    component: SpotifyApi
  },
  {
    path: '/playlist-splitter',
    name: 'playlist-splitter',
    component: PlaylistSplitter
  },
  {
    path: '/playlist-combiner',
    name: 'playlist-combiner',
    component: PlaylistCombiner
  },
  {
    path: '/track/:trackId?',
    name: 'track-info',
    component: TrackInfo
  },
  {
    path: '/artist/:artistId?',
    name: 'artist-info',
    component: ArtistInfo,
    props: true
  },
  {
    path: '/create-playlist/:success?',
    name: 'create-playlist',
    component: CreatePlaylist
  },
  {
    path: '/callback',
    redirect: '/spotify-api'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView()
  }
})

export default router
