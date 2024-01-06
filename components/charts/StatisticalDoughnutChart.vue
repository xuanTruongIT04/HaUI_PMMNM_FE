<template>
    <div>
      <DoughnutChart ref="doughnutRef" :chartData="dataChartProp" :options="options"/>
    </div>
</template>

<script lang="ts">
import { ChartData, ChartOptions } from 'chart.js';
import { defineComponent, ref } from 'vue';
import { DoughnutChart, ExtractComponentData } from 'vue-chart-3';

export default defineComponent({
  name: 'StatisticalDoughnutChart',
  components: { DoughnutChart },
  props: {
    dataChartProp: {
      type: Object as () => ChartData<'doughnut'>,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const doughnutRef = ref<ExtractComponentData<typeof DoughnutChart>>();

    const options = ref<ChartOptions<'doughnut'>>({
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: props.title,
        }
      },
      maintainAspectRatio: false,
    });
    return { doughnutRef, options };
  },
});
</script>
