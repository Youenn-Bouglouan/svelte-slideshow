<script>
  logMountAndDestroy('WhoIsItFor.svelte')

  import { logMountAndDestroy } from '../utils.js'
  import SlideContainer from '../SlideContainer.svelte'
</script>

<SlideContainer>
  <div class="parent">
    <h1>Who is Svelte for?</h1>
  </div>
</SlideContainer>

<style>
  .parent {
    flex: 1 0 auto;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    font-family: 'Comic Sans MS', cursive, sans-serif;
    margin-left: 10px;
    margin-right: 10px;
  }

  h1 {
    font-style: italic;
    color: blueviolet;
    margin: auto;
    font-family: 'Courier New', Courier, monospace;
  }
</style>
