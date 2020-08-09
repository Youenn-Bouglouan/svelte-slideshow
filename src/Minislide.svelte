<script>
  import { createEventDispatcher } from 'svelte'
  import { currentSlideReadOnly } from './navigationStores'

  export let slideInfo

  const dispatch = createEventDispatcher()
</script>

<button
  class={$currentSlideReadOnly !== slideInfo.index ? 'square' : 'square selected'}
  on:click={() => dispatch('minislideSelected', slideInfo)}>
  <div class="tooltip">
    {slideInfo.index}
    <!-- <div class="top">
      <div class="text-content">
        <h3>{slideInfo.description}</h3>
        <div class="miniature">
          <svelte:component this={slideInfo.slide} />
        </div>
        <i />
      </div>
    </div> -->

  </div>
</button>

<style>
  /* .tooltip {
    display: inline-block;
    position: relative;
    border-bottom: 1px dotted #666;
    text-align: left;
  }

  /* .tooltip h3 {
    margin: 5px;
    color: slategray;
  }

  .tooltip .top {
    min-width: 200px;
    max-width: 400px;
    max-height: 160px;
    top: -20px;
    left: 50%;
    transform: translate(-30%, -100%);
    color: black;
    background-color: orange;
    font-weight: normal;
    font-size: 14px;
    border-radius: 8px;
    position: absolute;
    z-index: 99999999;
    box-sizing: border-box;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
    display: none;
  }

  .tooltip:hover .top {
    display: block;
  }

  .tooltip .top i {
    position: absolute;
    top: 100%;
    left: 30%;
    margin-left: -15px;
    width: 30px;
    height: 15px;
    overflow: hidden;
  }

  .tooltip .top i::after {
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    background-color: orange;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
  } */

  .square {
    width: 34px;
    height: 34px;
    min-width: 34px;
    border: 1px solid grey;
    border-radius: 25px;

    display: flex;
    justify-content: center;
    align-items: center;

    margin: 5px;
  }

  .selected {
    border: 2px solid rgb(255, 136, 0);
    background-color: orange;
  }
</style>
