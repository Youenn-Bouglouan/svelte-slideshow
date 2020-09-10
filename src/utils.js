import { onMount, onDestroy } from 'svelte'

export function logMountAndDestroy(componentName) {
  onMount(() => {
    console.log(`${componentName} mounted`)
  })

  onDestroy(() => {
    console.log(`${componentName} destroyed`)
  })
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function highlightText(text) {
  return `<em style="color: grey">${text}</em>`
}
