import { readable } from 'svelte/store'

import TrueReactivity from './TrueReactivity.svelte'
import HelloComponentExample from './HelloComponentExample.svelte'
import ComponentUsage from './ComponentUsage.svelte'
import EmptySlide from './EmptySlide.svelte'
import ComponentSlot from './ComponentSlot.svelte'
import ButWhy from './ButWhy.svelte'
import Title from './Title.svelte'
import TimeChart from './TimeChart.svelte'

const slidesArray = [
  { description: 'Title', slide: Title },
  { description: 'Time Chart', slide: TimeChart },
  { description: 'True Reactivity', slide: TrueReactivity },
  { description: 'Hello Component Example', slide: HelloComponentExample },
  { description: 'Component Usage', slide: ComponentUsage },
  { description: 'Composition Via Slots', slide: ComponentSlot },
  { description: 'Empty Slide', slide: EmptySlide },
  { description: 'But Why?', slide: ButWhy },
]

export const slides = readable(
  slidesArray.map((elem, index) => ({
    ...elem,
    index: index + 1,
  }))
)
