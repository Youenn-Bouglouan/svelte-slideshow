<script>
  logMountAndDestroy('AnimationsTransitions.svelte')

  import { logMountAndDestroy } from '../utils.js'
  import SlideContainer from '../SlideContainer.svelte'
</script>

<SlideContainer>
  <div class="parent">
    <h1>Animations & Transitions</h1>

    <a href="https://svelte.dev/tutorial/animate" target="_blank">
      <h3>svelte/animate: animated todo list</h3>
    </a>

    <a
      href="https://svelte.dev/tutorial/custom-css-transitions"
      target="_blank">
      <h3>svelte/transition: custom CSS transitions</h3>
    </a>

    <a href="https://svelte.dev/tutorial/tweened" target="_blank">
      <h3>svelte/motion: sample progress bar animation</h3>
    </a>

    <a
      href="https://www.nytimes.com/interactive/2020/09/27/us/donald-trump-taxes-timeline.html"
      target="_blank">
      <h3>A real life example from the NY Times</h3>
    </a>
  </div>

</SlideContainer>

<style>
  .parent {
    flex: 1 0 auto;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
  }

  h1 {
    font-style: italic;
    color: darkorange;
    /* margin: auto; */
  }
</style>
