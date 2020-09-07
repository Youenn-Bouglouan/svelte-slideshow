<script>
  import { HighlightSvelte } from 'svelte-highlight'
  import { javascript } from 'svelte-highlight/languages'
  import { androidstudio } from 'svelte-highlight/styles'

  export let code
</script>

<svelte:head>
  {@html androidstudio}
</svelte:head>

<div class="codeSnippet">
  <HighlightSvelte language={javascript} {code} />
</div>

<style>
  .codeSnippet {
    display: flex;
    text-align: start;
    justify-content: center;
    font-size: xx-large;
  }
</style>
