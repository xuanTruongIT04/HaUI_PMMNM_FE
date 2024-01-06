<template>
  <div>
    <BarChart ref="barRef" :chartData="dataChartProp" :options="options" :labelsBarChart="labelsBarChart"/>
  </div>
</template>

<script lang="ts">
import { ChartData, ChartOptions } from 'chart.js';
import { defineComponent, ref } from 'vue';
import { BarChart, ExtractComponentData } from 'vue-chart-3';

export default defineComponent({
  name: 'StatisticalBarChart',
  components: { BarChart },
  props: {
    dataChartProp: {
      type: Object as () => ChartData<'bar'>,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    labelsBarChart: {
      type: Array,
      required: true,
    },
    colorsBarChart: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const barRef = ref<ExtractComponentData<typeof BarChart>>();

      const options = ref<ChartOptions<'bar'>>({
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
      display: true,
      text: props.title,
      align: 'center'
    },
  },
});


    return { barRef, options };
  },
});
</script>