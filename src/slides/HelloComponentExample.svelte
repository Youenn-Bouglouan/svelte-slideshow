<script>
  logMountAndDestroy('Slide 2')

  import { logMountAndDestroy } from '../utils.js'
  import SlideContainer from '../SlideContainer.svelte'
  import CodeSnippet from '../CodeSnippet.svelte'
  import Greet from '../sample-components/Greet.svelte'

  const title = `Full&nbsp;<em>Hello!</em>&nbsp;component`

  let codeSnippet1 = `// Greet.svelte file
<script>
  export let name = 'Stranger'
  $: hello = name ? \`Hello, \${name}!\` : 'Hello!'
<\/script>

<input class="inline" type="text" bind:value={name} />
<h3 class="inline">{hello}</h3>`
</script>

<SlideContainer>
  <h1>
    {@html title}
  </h1>
  <Greet name={'Unknown'} />
  <br />
  <Greet />
  <CodeSnippet code={codeSnippet1} />
</SlideContainer>

<style>
  h1 {
    display: flex;
    color: darkorange;
    justify-content: center;
  }
</style>
