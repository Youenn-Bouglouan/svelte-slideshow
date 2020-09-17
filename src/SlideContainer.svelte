<script>
  import { fly, fade } from 'svelte/transition'
  import { slideTransition } from './navigationStores'

  const defaultFlyInX = 1000
  const defaultFlyInY = 0
  const jumpFlyInX = 0
  const jumpFlyInY = 1000
  const duration = 300

  function calculateFlyInValues(transition) {
    if (transition === 'next') return [+defaultFlyInX, defaultFlyInY]
    else if (transition === 'previous') return [-defaultFlyInX, defaultFlyInY]
    else if (transition === 'jump') return [jumpFlyInX, jumpFlyInY]
  }

  let [flyX, flyY] = calculateFlyInValues($slideTransition)

  $: {
    // console.log(`flyX = ${flyX} | flyY = ${flyY} | trans = ${$slideTransition}`)
  }
</script>

<div
  class="container"
  in:fly={{ x: flyX, y: flyY, delay: duration, duration: duration }}
  out:fly={{ duration: duration }}>
  <slot>Slide Container</slot>
</div>

<style>
  .container {
    margin: 5px;
    flex: 1 0 auto;
    background-color: lightyellow;
    padding: 2px;
    display: flex;
    overflow-y: hidden;
  }
</style>
