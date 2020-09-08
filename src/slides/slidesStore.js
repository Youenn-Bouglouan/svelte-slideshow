import { readable } from 'svelte/store'

import TrueReactivity from './TrueReactivity.svelte'
import HelloComponentExample from './HelloComponentExample.svelte'
import ComponentUsage from './ComponentUsage.svelte'
import Slide4 from './Slide4.svelte'

export const slides = readable([
  { index: 1, description: 'Slide 1', slide: TrueReactivity },
  { index: 2, description: 'Slide 2', slide: HelloComponentExample },
  { index: 3, description: 'Slide 3', slide: ComponentUsage },
  { index: 4, description: 'Slide 4', slide: Slide4 },
  { index: 5, description: 'Slide 1', slide: TrueReactivity },
  { index: 6, description: 'Slide 2', slide: HelloComponentExample },
  { index: 7, description: 'Slide 3', slide: ComponentUsage },
  { index: 8, description: 'Slide 4', slide: Slide4 },
  { index: 9, description: 'Slide 1', slide: TrueReactivity },
  { index: 10, description: 'Slide 2', slide: HelloComponentExample },
  { index: 11, description: 'Slide 3', slide: ComponentUsage },
  { index: 12, description: 'Slide 4', slide: Slide4 },
  { index: 13, description: 'Slide 1', slide: TrueReactivity },
  { index: 14, description: 'Slide 2', slide: HelloComponentExample },
  { index: 15, description: 'Slide 3', slide: ComponentUsage },
  { index: 16, description: 'Slide 4', slide: Slide4 },
  { index: 17, description: 'Slide 1', slide: TrueReactivity },
  { index: 18, description: 'Slide 2', slide: HelloComponentExample },
  { index: 19, description: 'Slide 3', slide: ComponentUsage },
  { index: 20, description: 'Slide 4', slide: Slide4 },
  { index: 21, description: 'Slide 1', slide: TrueReactivity },
  { index: 22, description: 'Slide 2', slide: HelloComponentExample },
  { index: 23, description: 'Slide 3', slide: ComponentUsage },
  { index: 24, description: 'Slide 4', slide: Slide4 },
  { index: 25, description: 'Slide 1', slide: TrueReactivity },
])
