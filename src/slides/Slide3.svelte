<script>
  import { onMount, onDestroy } from 'svelte'
  import { logMountAndDestroy } from '../utils.js'
  import SlideContainer from './SlideContainer.svelte'

  logMountAndDestroy('Slide 3')
</script>

<SlideContainer>
  <h1>This is my third slide!</h1>
</SlideContainer>

<style>
  h1 {
    background-color: green;
  }
</style>
