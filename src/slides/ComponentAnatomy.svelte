<script>
  logMountAndDestroy('ComponentAnatomy.svelte')

  import { logMountAndDestroy, highlightText } from '../utils.js'
  import SlideContainer from '../SlideContainer.svelte'
  import CodeSnippet from '../CodeSnippet.svelte'

  let codeSnippet1 = `// MyComponent.svelte file
<script>
  // My JS/TS logic goes here
  let greetings = 'Hello, Stranger!'
<\/script>

<!-- My HTML goes here -->
<h1>{greetings}</h1>
<p>This is a paragraph...</p>

< style>
  /* My CSS goes here */
  h1 {
    color: 'green'
  }
</style>`
</script>

<SlideContainer>
  <div class="parent">
    <h1>Anatomy of a Component</h1>
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
    color: purple;
    justify-content: center;
    font-family: 'Comic Sans MS', cursive, sans-serif;
  }
</style>
