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
    <span class="tooltiptext">{slideInfo.description}</span>
  </div>
</button>

<style>
  /* Tooltip container */
  .tooltip {
    position: absolute;
    display: inline-block;
  }

  /* Tooltip text */
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: orange;
    color: white;
    text-align: center;
    font-size: larger;
    padding: 5px 0;
    border-radius: 6px;
    border-color: grey;
    border-width: 3px;
    border-style: solid;

    /* Position the tooltip text */
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;

    /* Fade in tooltip */
    opacity: 0;
    transition: opacity 0.3s;
  }

  /* Tooltip arrow */
  .tooltip .tooltiptext::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
    position: absolute;
  }

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
