<script>
  logMountAndDestroy('BenchmarkSpeed.svelte')

  import { logMountAndDestroy } from '../utils.js'
  import SlideContainer from '../SlideContainer.svelte'
</script>

<SlideContainer>
  <div class="parent">
    <img src="img/benchmarks-speed.PNG" alt="Benchmarks - Speed" height="700" />
    <a
      href="https://www.doria.fi/bitstream/handle/10024/177433/levlin_mattias.pdf?sequence=2&isAllowed=y"
      target="_blank">
      <h3>See full comparison here</h3>
    </a>
  </div>
</SlideContainer>

<style>
  .parent {
    flex: 1 0 auto;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
  }

  img {
    margin: auto;
  }
</style>
