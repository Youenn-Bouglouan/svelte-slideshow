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
  <div class="parent">
    <h1>True reactivity</h1>

    <div>
      <CodeSnippet code={codeSnippet1} />
      a:
      <input type="number" bind:value={a} />
      + b:
      <input type="number" bind:value={b} />
      = c:
      <b>{c}</b>
    </div>

    <div>
      <CodeSnippet code={codeSnippet2} />
      <Greet />
    </div>
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
    color: darkorange;
  }

  b {
    margin-left: 10px;
    color: darkslategrey;
    font-style: italic;
  }
</style>
