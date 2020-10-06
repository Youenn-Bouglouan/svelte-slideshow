<script>
  logMountAndDestroy('PerformanceButHow.svelte')

  import { logMountAndDestroy } from '../utils.js'
  import SlideContainer from '../SlideContainer.svelte'
  import { Shadow } from 'svelte-loading-spinners'
</script>

<SlideContainer>
  <div class="parent">
    <div>
      <h1>But... How?</h1>
      <h3>The slide when he talks about computer stuff and shit...</h3>
    </div>

    <div class="bottom">
      <Shadow size="120" color="#FF3E00" unit="px" />
    </div>
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

  h1 {
    text-align: center;
    font-style: italic;
    color: blueviolet;
    font-family: 'Courier New', Courier, monospace;
  }

  h3 {
    font-size: x-large;
  }
</style>
