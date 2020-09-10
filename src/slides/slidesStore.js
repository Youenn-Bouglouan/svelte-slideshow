import { readable } from 'svelte/store'

import TrueReactivity from './TrueReactivity.svelte'
import HelloComponentExample from './HelloComponentExample.svelte'
import ComponentUsage from './ComponentUsage.svelte'
import EmptySlide from './EmptySlide.svelte'
import ComponentSlot from './ComponentSlot.svelte'
import ButWhy from './ButWhy.svelte'

export const slides = readable([
  { index: 1, description: 'Slide 1', slide: TrueReactivity },
  { index: 2, description: 'Slide 2', slide: HelloComponentExample },
  { index: 3, description: 'Slide 3', slide: ComponentUsage },
  { index: 4, description: 'Slide 4', slide: ComponentSlot },
  { index: 5, description: 'Slide 5', slide: EmptySlide },
  { index: 6, description: 'Slide 6', slide: ButWhy },
])
