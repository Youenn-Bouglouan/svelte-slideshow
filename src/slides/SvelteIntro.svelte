<script>
  logMountAndDestroy('SvelteIntro.svelte')

  import { logMountAndDestroy } from '../utils.js'
  import SlideContainer from '../SlideContainer.svelte'
</script>

<SlideContainer>
  <div class="parent">
    <a href="https://svelte.dev/" target="_blank">
      <img src="img/svelte-logo.png" alt="Svelte Logo" />
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
    font-family: 'Comic Sans MS', cursive, sans-serif;
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
