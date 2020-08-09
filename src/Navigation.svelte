<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte'
  import { clamp } from './utils.js'
  import { slides } from './slides/slidesStore'
  import { slidesNav } from './navigationStores'
  import Minislides from './Minislides.svelte'
  import { location } from 'svelte-spa-router'

  // functions

  function dispatchSlideChanged(newSlideNumber, refreshUrlRequired) {
    console.log(`dispatchSlideChanged ${newSlideNumber}`)
    let slide = $slides[newSlideNumber - 1].slide
    dispatch('slideChanged', {
      slideIndex: newSlideNumber,
      slide,
      refreshUrlRequired
    })
  }

  function sameAsCurrent(index) {
    return $slidesNav.current === index
  }

  function applySlideOffset(offset) {
    slidesNav.set({
      current: clamp($slidesNav.current + offset, 1, totalSlides),
      previous: $slidesNav.current
    })
    dispatchSlideChanged($slidesNav.current, true)
  }

  function handleMinislideSelected(event) {
    if (!sameAsCurrent(event.detail.index)) {
      slidesNav.set({
        current: clamp(event.detail.index, 1, totalSlides),
        previous: $slidesNav.current
      })
      dispatchSlideChanged($slidesNav.current, true)
    }
  }

  // logic

  const dispatch = createEventDispatcher()
  let totalSlides = $slides.length
  let unsub

  onMount(() => {
    unsub = location.subscribe(x => {
      let slideIndex = parseInt($location.split('/').slice(-1)[0])
      if (!sameAsCurrent(slideIndex)) {
        // Here notice we pass 'dispatchSlideChanged(newCurrent, false)'
        // instead of          'dispatchSlideChanged($slidesNav.current, true)'
        // it looks like the update via slidesNav.set(...) is not immediately reflected
        // and we can't use the new value of slidesNav.current for dispatchSlideChanged(...)

        console.log(`slidesNav.current before: ${$slidesNav.current}`)
        let newCurrent = clamp(slideIndex, 1, totalSlides)
        console.log(`new current = ${newCurrent}`)

        slidesNav.set({
          current: newCurrent,
          previous: $slidesNav.current
        })

        console.log(`slidesNav.current after: ${$slidesNav.current}`)
        dispatchSlideChanged(newCurrent, false)
      }
    })

    // load initial page
    dispatchSlideChanged(1, true)
  })

  onDestroy(unsub)
</script>

<Minislides {slides} on:minislideSelected={handleMinislideSelected} />

<div>
  <button
    class:hidden={$slidesNav.current <= 1}
    on:click={() => applySlideOffset(-1)}>
    ◀
  </button>
  <button
    class:hidden={$slidesNav.current >= totalSlides}
    on:click={() => applySlideOffset(1)}>
    ▶
  </button>
  <p>{$slidesNav.current}</p>
</div>

<style>
  div {
    flex: 0 0 auto;
    user-select: none;
    background-color: orange;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  p {
    text-align: center;
    width: 22px;
    margin-right: 20px;
    margin-left: 10px;
    display: inline-block;
  }

  button {
    width: 20px;
    border: none;
    background-color: Transparent;
    display: inline-block;
    transition: all 0.1s ease-in-out;
  }

  button:hover {
    transform: scale(1.5);
  }

  button:active {
    background-color: transparent;
  }

  .hidden {
    opacity: 40%;
    pointer-events: none;
  }
</style>
