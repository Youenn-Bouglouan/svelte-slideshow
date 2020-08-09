<script>
  import Navigation from './Navigation.svelte'
  import { push } from 'svelte-spa-router'

  let currentSlide = undefined

  function handleSlideChanged(event) {
    currentSlide = event.detail.slide
    if (event.detail.refreshUrlRequired) {
      push(`/slides/${event.detail.slideIndex}`)
    }
  }
</script>

<div class="main">
  <div class="slide">
    <svelte:component this={currentSlide} />
  </div>

  <div class="navigation">
    <Navigation on:slideChanged={handleSlideChanged} />
  </div>
</div>

<style>
  .main {
    display: flex;
    flex-flow: column;

    /* background: grey; */
    height: 100%;
  }

  .slide {
    flex: 1 0 auto;
  }

  .navigation {
    display: flex;
    flex-flow: row;

    margin-left: 40px;
    margin-right: 40px;
    margin-bottom: 10px;
    margin-top: 10px;
    background-color: grey;
    border-radius: 10px;
    z-index: 20;
  }
</style>
