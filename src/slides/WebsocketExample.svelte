<script>
  logMountAndDestroy('WebSocketExample.svelte')

  import websocketStore from '../websocketStore.js'
  import { logMountAndDestroy } from '../utils.js'
  import SlideContainer from '../SlideContainer.svelte'

  let valueToSend = 'Initial Value'

  const initialValue = { event: valueToSend }
  export const myStore = websocketStore(
    'ws://ws-eu.pusher.com:80/app/71f53e7f119c81086c96?client=js&protocol=5', //   'wss://echo.websocket.org',
    initialValue,
    []
  )

  $: {
    // We can send data to the websocket like that:
    $myStore = {
      event: 'client-eventdsd',
      channel: '',
      data: valueToSend
    }
  }

  $: str = JSON.stringify($myStore)
</script>

<SlideContainer>
  <div class="parent">
    <h1>Websocket-backed store demo!</h1>

    <a href="https://github.com/arlac77/svelte-websocket-store" target="_blank">
      <h3>Check out the 'svelte-websocket-store' library here</h3>
    </a>

    <a href="https://www.websocket.org/echo.html" target="_blank">
      <h3>We use the public websocket server here</h3>
    </a>

    <h2>Value received: {$myStore.event}</h2>
    <h2>Value received: {$myStore.data}</h2>
    <p>{str}</p>

    <input class="inline" type="text" bind:value={valueToSend} />
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
    font-style: italic;
    color: brown;
  }
</style>
