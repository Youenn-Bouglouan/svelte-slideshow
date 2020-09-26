<script>
  logMountAndDestroy('BenchmarkBundleSize.svelte')

  import { logMountAndDestroy } from '../utils.js'
  import SlideContainer from '../SlideContainer.svelte'
</script>

<SlideContainer>
  <div class="parent">
    <img
      src="img/benchmarks-transfer-size.PNG"
      alt="Benchmarks - Bundle Size" />
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
