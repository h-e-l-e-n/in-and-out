<script setup>
import { onMounted, ref } from 'vue'
import { getRestockRecordAPI, addNewRecordAPI } from '../../apis/restockAPIs'

const restockList = ref([])
const newStockRecord = ref({
  product_name: '',
  amount: '',
  purchase_cost: '',
  expire_date: '',
  product_source: '',
  purchase_order_number: ''
})
const fields = [
  // { key: "id", label: "編號" },
  { key: "product_name", label: "商品名稱" },
  { key: "amount", label: "數量" },
  { key: "purchase_cost", label: "進貨成本" },
  { key: "expire_date", label: "有效日期" },
  { key: "product_source", label: "來源" },
  { key: "purchase_order_number", label: "訂單號碼" },
  { key: "build_time", label: "建立時間" },
]

const sourceOptions = [
  { id:1 ,name: 'Poya'},
  { id:2 ,name: 'Shopee'},
  { id:3 ,name: 'Momo'},
  { id:4 ,name: 'Other'},
  ]
const handleNewStock = async() => {
  try {
    await addNewRecordAPI(newStockRecord.value)
    newStockRecord.value = ""
  } catch(err) {
    console.log(err);
  }
}

const fetchAllRestocks = async() => {
  const res = await getRestockRecordAPI()
  restockList.value = res
}
onMounted(() => {
  fetchAllRestocks()
})

</script>
<template>
    <div class="restock">
      <BButton v-b-toggle.collapse-1 class="m-1 mb-4 restock-btn">+ 進貨</BButton>
      <BCollapse id="collapse-1">
        <div class="row" style="width: 80%;">
          <div class="col">
            <input v-model="newStockRecord.product_name" type="text" class="form-control" placeholder="商品名稱" aria-label="Product name">
          </div>
          <div class="col">
            <input v-model="newStockRecord.amount" type="number" class="form-control" placeholder="數量">
          </div>
          <div class="col">
            <input v-model="newStockRecord.purchase_cost" type="text" class="form-control" placeholder="進貨成本">
          </div>
          <div class="col">
            <input v-model="newStockRecord.expire_date" type="date" class="form-control" placeholder="有效期限">
          </div>
          <div class="col">
            <!-- <input type="text" class="form-control" placeholder="貨源"> -->
            <!-- <label for="inputState" class="form-label">State</label> -->
            <select v-model="newStockRecord.product_source" id="inputState" class="form-select" style="color: #515151;">
              <option selected disabled>貨源</option>
              <option v-for="option in sourceOptions" :key="option.id">{{ option.name }}</option>
            </select>
          </div>
          <div class="col">
            <input v-model="newStockRecord.purchase_order_number" type="text" class="form-control" placeholder="進貨單號">
          </div>
          <div class="col">
            <BButton class="buttons" @click="handleNewStock">新增</BButton>
          </div>
        </div>
      </BCollapse>
    </div>
      <div class="table mt-5">
        <BTable striped hover :items="restockList" :fields="fields" />
      </div>
</template>

<style scoped>
.table {
  width: 80%;
  table-layout: auto;
  justify-self: center;
  text-align: center;
}
.restock-btn {
  background-color: #EED19C;
  border: 0;
  color: #5C4033;
}
</style>
