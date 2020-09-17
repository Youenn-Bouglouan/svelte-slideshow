<script>
  logMountAndDestroy('HelloComponentExample.svelte')

  import { logMountAndDestroy, highlightText } from '../utils.js'
  import SlideContainer from '../SlideContainer.svelte'
  import CodeSnippet from '../CodeSnippet.svelte'
  import Greet from '../sample-components/Greet.svelte'

  const title = `Full&nbsp;${highlightText('Hello!')}&nbsp;component`

  let codeSnippet1 = `// Greet.svelte file
<script>
  export let name = 'Stranger'
  $: hello = name ? \`Hello, \${name}!\` : 'Hello!'
<\/script>

<input class="inline" type="text" bind:value={name} />
<h3 class="inline">{hello}</h3>`
</script>

<SlideContainer>
  <div class="parent">
    <h1>
      {@html title}
    </h1>
    <Greet name={'Unknown'} />
    <br />
    <Greet />
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
    color: blue;
    justify-content: center;
    font-family: Erica One;
  }
</style>
