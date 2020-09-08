<script>
  logMountAndDestroy('Slide 3')

  import { logMountAndDestroy } from '../utils.js'
  import SlideContainer from '../SlideContainer.svelte'
  import CodeSnippet from '../CodeSnippet.svelte'
  import Greet from '../sample-components/Greet.svelte'

  let name = 'Chuck'

  let codeSnippet1 = `<script>
  let name = 'Chuck'
<\/script>

<SlideContainer>
  <Greet name={'Unknown'} />
  <Greet />
  <Greet {name} />
  <CodeSnippet code={codeSnippet1} />
</SlideContainer>`
</script>

<SlideContainer>
  <h1>Component usage</h1>
  <Greet name={'Unknown'} />
  <br />
  <Greet />
  <br />
  <Greet {name} />
  <CodeSnippet code={codeSnippet1} />
</SlideContainer>

<style>
  h1 {
    display: flex;
    color: darkorange;
    justify-content: center;
  }
</style>
