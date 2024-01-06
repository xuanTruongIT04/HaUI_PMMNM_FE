<template>
  <div style="position: relative; width: 100%; height: 100%;" :hidden="notification.enabled">
    <NotificationView :notification-prop="notification" />
  </div>
  <div class="container">
    <div class="row">
      <div class="col-7 chart">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title text-bold">
              Thống kê lượt khám bệnh
            </h4>
            <StatisticalBarChart :dataChartProp="barDataChart" :labelsBarChart="labelsBarChart" :colorsBarChart="colorsBarChart" title="Lượt khám bệnh"/>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h4 class="card-title text-bold">
              
              Thống kê thu nhập
            </h4>
            <StatisticalDoughnutChart :dataChartProp="dataChart" title="Thống kê (đơn vị - triệu VNĐ)"/>
          </div>
        </div>
      </div>
      <div class="col-5 satictical-contain">
        <div class="card satictical-item">
          <div class="card-body">
            <h4 class="card-title text-bold">
              Thống kê thuốc
            </h4>
            <div class="card-body-content p-1">
              <div class="card mb-3" v-for="(medicine, index) in limitedMedicines"
              :key="index" >
                <div class="row align-items-center contain-item-medicine">
                  <div class="col-md-3 margin-right-less">
                    <div class="contain-image-medicine">
                      <img src="@/static/images/medicine-img-template.png" class="img-fluid img-medicine rounded-start" alt="...">
                    </div>
                  </div>
                  <div class="col-md-7">
                    <div class="card-medicine-body">
                      <h5 class="card-medicine-title text-bold">{{ medicine.name }}</h5>
                      <p class="card-text"><small class="text-muted text-collape">{{ medicine.ingredient }}</small></p>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="card-medicine-footer">
                      <span class="card-text"><small class="text-muted">{{ medicine.unit }}</small></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      </div>
    </div>
</template>

<script lang="ts">
import { ActivePages } from '~/assets/ts/BaseWebApplication'
import NotificationView from '@/components/app/Notification.vue'
import StatisticalDoughnutChart from "@/components/charts/StatisticalDoughnutChart.vue"
import StatisticalBarChart from "@/components/charts/StatisticalBarChart.vue"
import { MedicineManager } from '@/services/manager/MedicineManager'
import { Notification } from '@/helpers/Notification'
import { BaseTitleDisplay, clearChilds } from '~/assets/ts/BaseWebApplication'
import { ChartData } from 'node_modules/chart.js/types/index.esm'
import { DoughnutChart, ExtractComponentData } from 'node_modules/vue-chart-3/dist'
import { Pagination } from '@/helpers/Pagination'
import { Medicine } from '@/models/Medicine'

definePageMeta({
  layout: 'dashboard',
})
export default {
  components: {
    NotificationView,
    StatisticalDoughnutChart,
    StatisticalBarChart
  },
  data() {
    return {
      notification: new Notification(),
      pagination: new Pagination<Medicine>(),
      medicineManager: new MedicineManager(),
      limitedMedicines: [] as Medicine[],
    }
  },
  setup() {
    const dataDoughnut = ref([30, 40, 60]);
    const dataBar = ref([ 300, 170, 590, 230, 340, 210, 192, 140, 210, 310, 440, 532]);
    const doughnutRef = ref<ExtractComponentData<typeof DoughnutChart>>();
    const labelsBarChart = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const colorsBarChart = "#E52323"


    const dataChart = computed<ChartData<'doughnut'>>(() => ({
      labels: ['Thuốc', 'Chỉ định', 'Dịch vụ'],
      datasets: [
        {
          data: dataDoughnut.value,
          backgroundColor: ['#7AD3FF', '#FE6C6C', '#FFD572'],
        },
      ],
    }));

    const barDataChart = computed<ChartData<'bar'>>(() => ({
      labels: labelsBarChart,
      datasets: [
        {
          data: dataBar.value,
          backgroundColor: colorsBarChart,
        },
      ],
    }));

    return {dataChart, doughnutRef, barDataChart, labelsBarChart, colorsBarChart}
  },
  async mounted() {
    clearChilds()
    this.pagination = await this.medicineManager.getAllMedicine(1, 10)
    this.limitedMedicines = this.medicineManager.getPagination().rows.slice(0, 10)
  },
  methods: {
    async getAllMedicine() {
      if (
        this.pagination.currentPage !== undefined
        && this.pagination.row !== undefined
      ) {
        this.pagination = await this.medicineManager.getAllMedicine(
          this.pagination.currentPage,
          this.pagination.row,
        )
      }
    },
  },
}
ActivePages.OverviewPage = ''
</script>

<style scoped lang="scss">
.text-bold {
  font-weight: 600 !important;
}

.satictical-contain .card-body{ 
  padding: 0 10px 10px 10px !important;
}

.contain-item-medicine {
  padding: 10px;
  border-radius: 8px;
  background: #F7F7F7;
}

.margin-right-less {
  margin-right: -20px;
}

.contain-image-medicine {
    max-width: 100%;
    height: auto;
}

.img-medicine {
  width: 62% !important;
  height: 62%!important;
  margin-left: 8px;
}

.card-medicine-title {
  font-size: 16px;
  font-weight: 800 !important;
}

.text-collape {
  display: inline-block;
  width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 575.98px) {
}
@media (min-width: 576px) and (max-width: 767.98px) {
}
@media (min-width: 768px) and (max-width: 991.98px) {
}
@media (min-width: 992px) and (max-width: 1199.98px) {
}
@media (min-width: 1200px) and (max-width: 1399.98px) {
}
@media (min-width: 1400px) {
}
</style>
