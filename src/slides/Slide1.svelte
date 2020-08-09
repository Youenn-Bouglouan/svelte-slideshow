<script>
  import { onMount, onDestroy } from 'svelte'
  import { logMountAndDestroy } from '../utils.js'
  import SlideContainer from './SlideContainer.svelte'

  logMountAndDestroy('Slide 1')
</script>

<SlideContainer>
  <h1>This is my first slide!</h1>

  <footer>Test</footer>
</SlideContainer>

<style>
  h1 {
    background-color: brown;
    align-content: center;
  }
</style>
