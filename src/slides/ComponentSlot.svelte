<script>
  logMountAndDestroy('ComponentSlot.svelte')

  import { logMountAndDestroy, highlightText } from '../utils.js'
  import SlideContainer from '../SlideContainer.svelte'
  import CodeSnippet from '../CodeSnippet.svelte'

  const title = `Easy component composition with&nbsp;${highlightText('slots')}`

  let codeSnippet1 = `// SlideContainer.svelte file
<div class="container">
  <slot>Slide Container</slot>
</div>`

  let codeSnippet2 = `// ComponentSlot.svelte
<SlideContainer>
  <h1>Component composition with slots</h1>
  <CodeSnippet code={codeSnippet1} />
  <CodeSnippet code={codeSnippet2} />
</SlideContainer>`
</script>

<SlideContainer>
  <div class="parent">
    <h1>
      {@html title}
    </h1>
    <h3>Declaration</h3>
    <CodeSnippet code={codeSnippet1} />
    <h3>Usage</h3>
    <CodeSnippet code={codeSnippet2} />
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
    color: blueviolet;
    justify-content: center;
    font-family: 'Comic Sans MS', cursive, sans-serif;
  }
</style>
