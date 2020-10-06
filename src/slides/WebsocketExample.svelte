<script>
  logMountAndDestroy('WebSocketExample.svelte')

  import websocketStore from '../websocketStore.js'
  import { logMountAndDestroy } from '../utils.js'
  import SlideContainer from '../SlideContainer.svelte'

  function subscribe() {
    $myStore = {
      event: 'pusher:subscribe',
      data: {
        channel: channelName
      }
    }
  }

  function unsubscribe() {
    $myStore = {
      event: 'pusher:unsubscribe',
      data: {
        channel: channelName
      }
    }
  }

  let channelName = ''

  const myStore = websocketStore(
    'ws://ws-eu.pusher.com:80/app/71f53e7f119c81086c96?client=js&protocol=5', //   'wss://echo.websocket.org',
    {},
    []
  )

  $: fullResponse = JSON.stringify($myStore)
</script>

<SlideContainer>
  <div class="parent">
    <h1>Websocket-backed store demo!</h1>

    <a href="https://github.com/arlac77/svelte-websocket-store" target="_blank">
      <h3>Check out the 'svelte-websocket-store' library here</h3>
    </a>

    <a href="https://pusher.com" target="_blank">
      <h3>We use a public websocket server created here</h3>
    </a>

    <input
      type="text"
      placeholder="Enter channel name here"
      bind:value={channelName} />
    <button on:click={subscribe}>Subscribe to channel</button>
    <button on:click={unsubscribe}>Unsubscribe from channel</button>
    <h3>{$myStore.data}</h3>
    <p>{fullResponse}</p>
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
