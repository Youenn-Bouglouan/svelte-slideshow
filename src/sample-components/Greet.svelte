<script>
  export let name = 'Stranger'
  $: hello = name ? `Hello, ${name}!` : 'Hello!'
</script>

<div>
  <input class="inline" type="text" bind:value={name} />
  <h3 class="inline">{hello}</h3>
</div>

<style>
  .inline {
    display: inline-block;
  }

  h3 {
    margin-left: 10px;
    color: darkslategrey;
    font-style: italic;
  }
</style>
