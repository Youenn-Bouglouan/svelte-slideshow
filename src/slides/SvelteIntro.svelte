<script>
  logMountAndDestroy('SvelteIntro.svelte')

  import { logMountAndDestroy } from '../utils.js'
  import SlideContainer from '../SlideContainer.svelte'
</script>

<SlideContainer>
  <div class="parent">
    <a class="center" href="https://svelte.dev/" target="_blank">
      <img src="img/svelte-logo.png" alt="Svelte Logo" />
    </a>

    <a
      class="bottom"
      href="https://www.youtube.com/watch?v=AdNJ3fydeao"
      target="_blank">
      <h3>Watch this talk from Rich Harris (the creator of Svelte)</h3>
    </a>
  </div>
</SlideContainer>

<style>
  .parent {
    flex: 1 0 auto;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    align-items: center;
    font-family: 'Comic Sans MS', cursive, sans-serif;
    margin-left: 10px;
    margin-right: 10px;
  }

  /* .center {
    flex: 1 0 auto;
    align-self: center;
  }*/

  /* .bottom {
    flex: 1 0 auto;
    align-self: flex-end;
  } */
</style>
