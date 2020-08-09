<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { clamp } from './utils.js'
  import Minislide from './Minislide.svelte'

  export let slides
</script>

<div class="minislides">
  {#each $slides as slide}
    <Minislide slideInfo={slide} on:minislideSelected />
  {/each}
</div>

<style>
  div.minislides {
    flex: 1 1 auto;
    align-items: center;
    justify-content: stretch;
    overflow-x: auto;
    padding-left: 10px;
  }

  div {
    display: flex;
  }
</style>
