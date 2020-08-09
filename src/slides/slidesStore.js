import { readable } from 'svelte/store'

import Slide1 from './Slide1.svelte'
import Slide2 from './Slide2.svelte'
import Slide3 from './Slide3.svelte'
import Slide4 from './Slide4.svelte'

export const slides = readable([
  { index: 1, description: 'Slide 1', slide: Slide1 },
  { index: 2, description: 'Slide 2', slide: Slide2 },
  { index: 3, description: 'Slide 3', slide: Slide3 },
  { index: 4, description: 'Slide 4', slide: Slide4 },
  { index: 5, description: 'Slide 1', slide: Slide1 },
  { index: 6, description: 'Slide 2', slide: Slide2 },
  { index: 7, description: 'Slide 3', slide: Slide3 },
  { index: 8, description: 'Slide 4', slide: Slide4 },
  { index: 9, description: 'Slide 1', slide: Slide1 },
  { index: 10, description: 'Slide 2', slide: Slide2 },
  { index: 11, description: 'Slide 3', slide: Slide3 },
  { index: 12, description: 'Slide 4', slide: Slide4 },
  { index: 13, description: 'Slide 1', slide: Slide1 },
  { index: 14, description: 'Slide 2', slide: Slide2 },
  { index: 15, description: 'Slide 3', slide: Slide3 },
  { index: 16, description: 'Slide 4', slide: Slide4 },
  { index: 17, description: 'Slide 1', slide: Slide1 },
  { index: 18, description: 'Slide 2', slide: Slide2 },
  { index: 19, description: 'Slide 3', slide: Slide3 },
  { index: 20, description: 'Slide 4', slide: Slide4 },
  { index: 21, description: 'Slide 1', slide: Slide1 },
  { index: 22, description: 'Slide 2', slide: Slide2 },
  { index: 23, description: 'Slide 3', slide: Slide3 },
  { index: 24, description: 'Slide 4', slide: Slide4 },
  { index: 25, description: 'Slide 1', slide: Slide1 },
])
