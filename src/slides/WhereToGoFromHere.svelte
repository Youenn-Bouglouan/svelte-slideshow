<script>
  logMountAndDestroy('WhereToGoFromHere.svelte')

  import { logMountAndDestroy } from '../utils.js'
  import SlideContainer from '../SlideContainer.svelte'
</script>

<SlideContainer>
  <div class="parent">
    <h1>That's it, thank you!!</h1>
    <h2>What's next?</h2>

    <a href="tutorial: https://svelte.dev/tutorial/basics " target="_blank">
      <h3>Go through the official Svelte tutorial</h3>
    </a>

    <a href="https://svelte.dev/repl/hello-world" target="_blank">
      <h3>Play with the Svelte REPL</h3>
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
    color: blueviolet;
    font-family: 'Courier New', Courier, monospace;
  }

  h2 {
    color: darkorange;
    font-family: 'Courier New', Courier, monospace;
  }
</style>
