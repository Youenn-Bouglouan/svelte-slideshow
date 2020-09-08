<script>
  import { HighlightSvelte } from 'svelte-highlight'
  import { javascript, css } from 'svelte-highlight/languages'
  import { androidstudio } from 'svelte-highlight/styles'

  export let code
  export let lang = 'js'
  $: language = lang === 'js' ? javascript : css
</script>

<svelte:head>
  {@html androidstudio}
</svelte:head>

<div class="codeSnippet">
  <HighlightSvelte {language} {code} />
</div>

<style>
  .codeSnippet {
    display: flex;
    text-align: start;
    justify-content: center;
    font-size: xx-large;
  }
</style>
