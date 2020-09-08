<script>
  logMountAndDestroy('Slide 1')

  import { logMountAndDestroy } from '../utils.js'
  import SlideContainer from '../SlideContainer.svelte'
  import CodeSnippet from '../CodeSnippet.svelte'
  import Greet from '../sample-components/Greet.svelte'

  let codeSnippet1 = `<script>
  let a = 0;
  let b = 0;
  $: c = a + b;
<\/script>`

  let a = 0
  let b = 0
  $: c = a + b

  let codeSnippet2 = `<script>
  let name = 'Stranger'
  $: hello = \`Hello, \${name}!\`
<\/script>`

  let name = 'Stranger'
  $: hello = `Hello, ${name}!`
</script>

<SlideContainer>
  <h1>True reactivity</h1>

  <div>
    <CodeSnippet code={codeSnippet1} />
    a:
    <input type="number" bind:value={a} />
    + b:
    <input type="number" bind:value={b} />
    = c: {c}
  </div>

  <div>
    <CodeSnippet code={codeSnippet2} />
    <Greet />
  </div>
</SlideContainer>

<style>
  h1 {
    display: flex;
    color: darkorange;
    justify-content: center;
  }
</style>
