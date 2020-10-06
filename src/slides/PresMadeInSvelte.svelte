<script>
  logMountAndDestroy('PresMadeInSvelte.svelte')

  import { logMountAndDestroy } from '../utils.js'
  import SlideContainer from '../SlideContainer.svelte'
</script>

<SlideContainer>
  <div class="parent">
    <h1>This presentation was made in Svelte!</h1>
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
    color: olive;
    margin: auto;
    font-size: 2.5em;
    font-family: 'Comic Sans MS', cursive, sans-serif;
  }
</style>
