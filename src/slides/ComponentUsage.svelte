<script>
  logMountAndDestroy('ComponentUsage.svelte')

  import { logMountAndDestroy } from '../utils.js'
  import SlideContainer from '../SlideContainer.svelte'
  import CodeSnippet from '../CodeSnippet.svelte'
  import Greet from '../sample-components/Greet.svelte'

  let name = 'Chuck'

  let codeSnippet1 = `<script>
  let name = 'Chuck'
  let codeSnippet = '...'
<\/script>

<SlideContainer>
  <Greet name={'Unknown'} />
  <Greet />
  <Greet {name} />
  <CodeSnippet code={codeSnippet} />
</SlideContainer>`
</script>

<SlideContainer>
  <div class="parent">
    <h1>Component usage</h1>
    <Greet name={'Unknown'} />
    <br />
    <Greet />
    <br />
    <Greet {name} />
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
    color: fuchsia;
    justify-content: center;
    font-family: 'Courier New', Courier, monospace;
    font-style: oblique;
    font-stretch: expanded;
  }
</style>
