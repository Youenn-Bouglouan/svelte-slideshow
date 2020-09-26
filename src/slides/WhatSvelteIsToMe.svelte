<script>
  logMountAndDestroy('WhatSvelteIsToMe.svelte')

  import { logMountAndDestroy } from '../utils.js'
  import SlideContainer from '../SlideContainer.svelte'
</script>

<SlideContainer>
  <div class="parent">
    <h1>What Svelte is (to me)</h1>
    <ul>
      <li>Performant</li>
      <li>Well-engineered</li>
      <li>Simple</li>
      <li>Intuitive</li>
      <li>Awesome</li>
      <li>...</li>
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
    color: orangered;
    /* margin: auto; */
  }

  li {
    color: darkslategrey;
    font-size: xx-large;
  }
</style>
