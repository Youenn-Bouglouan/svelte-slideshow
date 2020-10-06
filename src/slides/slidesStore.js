import { readable } from 'svelte/store'

import TrueReactivity from './TrueReactivity.svelte'
import HelloComponentExample from './HelloComponentExample.svelte'
import ComponentUsage from './ComponentUsage.svelte'
import EmptySlide from './EmptySlide.svelte'
import ComponentSlot from './ComponentSlot.svelte'
import ButWhy from './ButWhy.svelte'
import Title from './Title.svelte'
import TimeChart from './TimeChart.svelte'
import SvelteIntro from './SvelteIntro.svelte'
import PresMadeInSvelte from './PresMadeInSvelte.svelte'
import BenchmarkBundleSize from './BenchmarkBundleSize.svelte'
import BenchmarkLOC from './BenchmarkLOC.svelte'
import BenchmarkSpeed from './BenchmarkSpeed.svelte'
import WhatSvelteIsToMe from './WhatSvelteIsToMe.svelte'
import ComponentAnatomy from './ComponentAnatomy.svelte'
import WhoIsItFor from './WhoIsItFor.svelte'
import PerformanceButHow from './PerformanceButHow.svelte'
import AnimationsTransitions from './AnimationsTransitions.svelte'
import StateManagement from './StateManagement.svelte'
import WhereToGoFromHere from './WhereToGoFromHere.svelte'
import WebSocketExample from './WebSocketExample.svelte'

const slidesArray = [
  { description: 'Websocket-Backed Store', slide: WebSocketExample },
  { description: 'Title', slide: Title },
  { description: 'Svelte Intro', slide: SvelteIntro },
  { description: 'What Svelte Is To Me?', slide: WhatSvelteIsToMe },
  { description: 'Who Svelte Is For?', slide: WhoIsItFor },
  { description: 'Made In Svelte', slide: PresMadeInSvelte },
  { description: 'Time Chart', slide: TimeChart },
  { description: 'Benchmarks - Bundle Size', slide: BenchmarkBundleSize },
  { description: 'Benchmarks - LOC', slide: BenchmarkLOC },
  { description: 'Benchmarks - Speed', slide: BenchmarkSpeed },
  { description: 'Performance: But How?', slide: PerformanceButHow },
  { description: 'True Reactivity', slide: TrueReactivity },
  { description: 'Anatomy Of A Component', slide: ComponentAnatomy },
  { description: 'Hello Component Example', slide: HelloComponentExample },
  { description: 'Component Usage', slide: ComponentUsage },
  { description: 'Composition Via Slots', slide: ComponentSlot },
  { description: 'Empty Slide', slide: EmptySlide },
  { description: 'But Why?', slide: ButWhy },
  { description: 'Animations & Transitions', slide: AnimationsTransitions },
  { description: 'State Management & Stores', slide: StateManagement },
  { description: 'The End!', slide: WhereToGoFromHere },
]

export const slides = readable(
  slidesArray.map((elem, index) => ({
    ...elem,
    index: index + 1,
  }))
)
