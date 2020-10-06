<script>
  logMountAndDestroy('TimeChart.svelte')

  import { logMountAndDestroy } from '../utils.js'
  import SlideContainer from '../SlideContainer.svelte'
  import Pie from 'svelte-chartjs/src/Pie.svelte'

  let data = {
    datasets: [
      {
        data: [12.5, 25, 5, 5, 17.5, 35],
        backgroundColor: [
          'mediumaquamarine',
          'limegreen',
          'lightcoral',
          'lightsalmon',
          'darkkhaki',
          'chocolate'
        ]
      }
    ],
    labels: [
      'Learning Svelte',
      'Creating the viewer',
      'Implementing routing',
      'fighting JS',
      'Creating the slides',
      'Cursing at CSS & Flexbox'
    ]
  }
</script>

<SlideContainer>
  <div class="parent">
    <h3>I spent around 40h on that project</h3>
    <div class="chart">
      <Pie {data} options={{ maintainAspectRatio: false, responsive: true }} />
    </div>
  </div>
</SlideContainer>

<style>
  .parent {
    flex: 1 0 auto;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: stretch;
    font-family: 'Comic Sans MS', cursive, sans-serif;
    margin-left: 10px;
    margin-right: 10px;
  }

  .chart {
    flex: 1 0 auto;
  }

  h3 {
    font-style: italic;
    color: darkolivegreen;
    text-align: center;
  }
</style>
