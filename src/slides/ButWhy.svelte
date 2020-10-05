<script>
  logMountAndDestroy('ButWhy.svelte')

  import { logMountAndDestroy } from '../utils.js'
  import CodeSnippet from '../CodeSnippet.svelte'
  import SlideContainer from '../SlideContainer.svelte'

  let codeSnippet1 = `// SlideContainer.svelte file
<div
  class="container"
  in:fly={{ x: flyX, y: flyY, delay: duration, duration: duration }}
  out:fly={{ duration: duration }}>
  <slot>Slide Container</slot>
</div>`
</script>

<SlideContainer>
  <div class="parent">
    <h1>But why?</h1>
    <CodeSnippet code={codeSnippet1} />
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
    display: flex;
    color: olivedrab;
    align-self: center;
    justify-content: center;
    font-family: Erica One;
  }
</style>
