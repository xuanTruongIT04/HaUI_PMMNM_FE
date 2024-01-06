<script>
import { Pagination } from '@/helpers/Pagination'

export default {
  name: 'PaginationView',
  props: {
    pagination: Pagination,
    start: Number,
    end: Number,
    content: String,
  },
  emits: ['updatePagination'],
  data() {
    return {
      rowPerPage: [10, 15, 20],
      numbers: [1, 2, 3],
      paginationChild: this.pagination,
      buttonStart: this.start,
      buttonEnd: this.end,
    }
  },
  watch: {
    pagination(newPagination) {
      // Khi prop 'end' thay đổi từ component cha
      // Cập nhật giá trị của 'buttonEnd' và gọi phương thức 'push'
      this.paginationChild = newPagination
    },
  },
  mounted() {
    this.push()
  },
  methods: {
    push() {
      this.clear()
      for (let i = this.buttonStart; i < this.buttonEnd - 1; i++)
        this.numbers.push(i + 1)
    },
    clear() {
      this.numbers = []
    },
    updatePagination() {
      this.$emit('updatePagination', this.paginationChild)
    },
    movePage(number) {
      this.setNoneActive(this.paginationChild.currentPage)
      this.setActive(number)
      if (number === this.paginationChild.currentPage)
        return
      this.paginationChild.currentPage = number
      this.updatePagination()
      if (number === 1)
        return null
      if (this.buttonEnd - number - 1 === 2) {
        this.buttonStart--
        this.buttonEnd--
        this.push()
        return
      }
      if (this.buttonEnd - 1 === this.paginationChild.totalPage)
        return
      if ((this.buttonEnd - 1) / number === 1) {
        this.buttonStart++
        this.buttonEnd++
        this.push()
      }
    },
    firtPage() {
      
      this.buttonStart = this.start
      this.buttonEnd = this.end
      this.push()
      setTimeout(() => {
        this.setNoneActive(this.paginationChild.currentPage)
        this.setActive(1)
        this.paginationChild.currentPage = 1
        this.updatePagination()
      }, 10);
      
    },
    lastPage() {
      this.buttonStart = this.paginationChild.totalPage - 3
      this.buttonEnd = this.paginationChild.totalPage + 1
      this.push()
      setTimeout(() => {
        this.setNoneActive(this.paginationChild.currentPage)
        this.setActive(this.paginationChild.totalPage)
        this.paginationChild.currentPage = this.paginationChild.totalPage
        this.updatePagination()
      }, 10);
      
    },
    setActive(number) {
      if (number < this.paginationChild.totalPage && number >= 2) {
        const button = document.getElementById('child-center')
        if (button === null || button === undefined) {
          return
        }
        button.style.backgroundColor = 'blue'
        button.style.color = 'white'
        return
      }
      const button = document.getElementById(`button-${number}`)
      if (button === null || button === undefined) {
        return
      }
      button.style.backgroundColor = 'blue'
      button.style.color = 'white'
    },
    setNoneActive(number) {
      if (number < this.paginationChild.totalPage - 1 && number > 2) {
        return
      }
      const buttons = document.getElementsByClassName('button')
      if (buttons === null || buttons === undefined) {
        return
      }
      for (let i = 0; i < buttons.length; i++){
        buttons[i].style.backgroundColor = 'beige'
      buttons[i].style.color = 'black'
      }
      const child = document.getElementById('child-center')
      if (child === null || child === undefined) {
        return
      }
      child.style.backgroundColor = 'beige'
      child.style.color = 'black'
      const button = document.getElementById(`button-${number}`)
      if (button === null || button === undefined) {
        return
      }
      button.style.backgroundColor = 'beige'
      button.style.color = 'black'
    },
  },
}
</script>

<template>
  <div class="row pagination mt-2">
    <div class="col-lg-12">
    <div class="row">
      <div class="col-lg-3 d-flex flex-column justify-content-center">
        <div class="row">
          <div class="col-lg-5 d-flex flex-row justify-content-center">
            <p>Tổng số:</p>
          </div>
          <div class="col-lg-1 d-flex flex-row justify-content-center">
            <p>{{ pagination.totalRecord }}</p>
          </div>
          <div class="col-lg-5 d-flex flex-row justify-content-center">
            <p>{{ content }}</p>
          </div>
          <div class="col-lg-1" />
        </div>
      </div>
      <div class="col-lg-9 d-flex flex-column justify-content-end">
        <div class="row d-flex flex-row justify-content-end">
          <div class="col-lg-2">
            <p>Số {{ content }} trên một trang</p>
          </div>
          <div class="col-lg-1 d-flex flex-column justify-content-center">
            <select
              id="row"
              v-model="paginationChild.row"
              name="row"
              @change="updatePagination"
            >
              <option
                v-for="(number, index) in rowPerPage"
                :key="index"
                :value="number"
              >
                {{ number }}
              </option>
            </select>
          </div>
          <div class="col-lg-5 d-flex flex-column justify-content-center">
            <div class="row d-flex flex-row justify-content-end">
              <div class="col-lg-2" />
              <div class="col-lg-1">
                <a class="button" href="#" @click="firtPage()">
                  <font-awesome-icon :icon="['fas', 'chevron-left']" />
                </a>
              </div>
              <div
                v-for="(number, index) in numbers"
                :key="index"
                class="col-lg-1 ms-1"
              >
                <a
                  v-if="index === Math.floor(numbers.length / 2)"
                  class="button child-center"
                  href="#"
                  id="child-center"
                  @click="movePage(number)"
                >
                  {{ number }}
                </a>
                <a v-else class="button" href="#" @click="movePage(number)" 
                  :id="`button-${number}`">
                  {{ number }}
                </a>
              </div>
              <div
                v-if="paginationChild.totalPage>numbers[numbers.length-1]"
                class="col-lg-2 ms-1 me-1"
              >
                <div class="row">
                  <div class="col-lg-6">
                    <a class="ps-2 pe-2 dots" href="#">
                      <font-awesome-icon :icon="['fas', 'ellipsis']" />
                    </a>
                  </div>
                  <div class="col-lg-5 ms-1">
                    <a class="button" href="#" @click="lastPage()">
                      {{ paginationChild.totalPage }}
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-lg-1 ms-1">
                <a class="button" href="#" @click="lastPage()">
                  <font-awesome-icon :icon="['fas', 'chevron-right']" />
                </a>
              </div>
              <div class="col-lg-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<style>
*,
p {
  margin: 0px;
}
#row {
  border: 1px solid black;
  border-radius: 5px;
  width: 50px;
}
.button {
  padding-left: 10px;
  padding-right: 10px;
}
.button,
.dots {
  border-radius: 5px;
  background-color: beige;
  border: 1px solid black;
}
.child-center {
  background-color: blue;
  color: white;
}
.pagination {
  background-color: #e7edff;
  height: 50px;
  border-radius: 10px;
  margin: 0px;
}
</style>
