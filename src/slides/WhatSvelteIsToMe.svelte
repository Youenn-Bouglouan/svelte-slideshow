<script>
  logMountAndDestroy('WhatSvelteIsToMe.svelte')

  import { logMountAndDestroy } from '../utils.js'
  import SlideContainer from '../SlideContainer.svelte'

  let items = [
    { value: 'Performant', color: 'blue' },
    { value: 'Well-engineered', color: 'green' },
    { value: 'Simple', color: 'orange' },
    { value: 'Intuitive', color: 'teal' },
    { value: 'Reactive', color: 'brown' },
    { value: 'Awesome!', color: 'purple' }
  ]
</script>

<SlideContainer>
  <div class="parent">
    <h1>What Svelte is (to me)</h1>

    <ul>
      {#each items as { value, color }, i}
        <li style="color: {color}">{value}</li>
      {/each}
    </ul>
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
    font-style: italic;
    color: darkorange;
    /* margin: auto; */
  }

  li {
    color: darkslategrey;
    font-size: xx-large;
  }
</style>
