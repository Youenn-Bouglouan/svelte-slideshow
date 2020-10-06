import { writable, derived } from 'svelte/store'

const initialSlidesState = { current: 1, previous: 1 }

export const slidesNav = writable(initialSlidesState)

export const currentSlideReadOnly = derived(slidesNav, ($x) => $x.current)

export const slideTransition = derived(slidesNav, ($state) => {
  // console.log(`in trans: curr1: ${$state.current} | prev1: ${$state.previous}`)

  if ($state.current === $state.previous + 1) return 'next'
  else if ($state.current === $state.previous - 1) return 'previous'
  else return 'jump'
})
