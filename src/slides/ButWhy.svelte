<script>
  logMountAndDestroy('EmptySlide.svelte')

  import { logMountAndDestroy } from '../utils.js'
  import SlideContainer from '../SlideContainer.svelte'
</script>

<SlideContainer>
  <h1>But why?</h1>
</SlideContainer>

<style>
  h1 {
    display: flex;
    align-self: center;
    justify-content: center;
  }
</style>
