<script>
  logMountAndDestroy('StateManagement.svelte')

  import { logMountAndDestroy } from '../utils.js'
  import SlideContainer from '../SlideContainer.svelte'
</script>

<SlideContainer>
  <div class="parent">
    <h1>State management in a nutshell</h1>

    <ul>
      <li>Writable store</li>
      <li>Readable store</li>
      <li>Derived store</li>
      <li>You can roll your own custom store as well</li>
    </ul>

    <a href="https://svelte.dev/tutorial/writable-stores" target="_blank">
      <h3>svelte/store tutorial</h3>
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
    font-style: italic;
    color: darkorange;
    /* margin: auto; */
  }

  li {
    color: darkslategrey;
    font-size: xx-large;
  }
</style>
