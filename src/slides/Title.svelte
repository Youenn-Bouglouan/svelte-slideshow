<script>
  logMountAndDestroy('Title.svelte')

  import { logMountAndDestroy } from '../utils.js'
  import SlideContainer from '../SlideContainer.svelte'
</script>

<SlideContainer>
  <div class="parent">
    <h1>You won't believe what this JavaScript framework can do for you!</h1>
    <p>Youenn Bouglouan</p>
  </div>
</SlideContainer>

<style>
  /* see post here! https://stackoverflow.com/questions/52819001/flexbox-align-one-element-center-and-another-at-the-bottom-of-the-page */
  .parent {
    flex: 1 0 auto;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    font-family: 'Comic Sans MS', cursive, sans-serif;
    margin-left: 10px;
    margin-right: 10px;
  }

  h1 {
    font-style: italic;
    color: orangered;
    margin: auto;
  }

  p {
    color: grey;
    align-self: flex-end;
  }
</style>
