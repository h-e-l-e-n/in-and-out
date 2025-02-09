<script setup>
import { onMounted, ref, watch } from 'vue'
import { getRestockRecordAPI, addNewRecordAPI } from '../../apis/restockAPIs'
import { formatDate, formatDateTime } from '@/utils/dayjsDate'

const restockList = ref([])
const selectedOption = ref('option2')
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
  { key: "expire_date", label: "有效日期", formatter: value => formatDate(value) },
  { key: "product_source", label: "來源" },
  { key: "purchase_order_number", label: "訂單號碼" },
  { key: "build_time", label: "建立時間", formatter: value => formatDateTime(value)},
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
    newStockRecord.value = {}
  } catch(err) {
    console.log(err);
  }
}

const fetchAllRestocks = async() => {
  const res = await getRestockRecordAPI()
  restockList.value = res
  console.log(restockList.value);

}
const imageUrl = ref(null);

const previewImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageUrl.value = URL.createObjectURL(file);
  }
};

// watch(() => restockList.value, (newVal) => {
//   if(newVal) {
//     fetchAllRestocks()
//   }
// })
onMounted(() => {
  fetchAllRestocks()
})

</script>
<template>
    <div class="restock">
      <BButton v-b-toggle.collapse-1 class="mx-5 mt-5 mb-3 restock-btn">+ 進貨</BButton>
      <BCollapse id="collapse-1" class="mx-4">
        <div class="row add-stock-area mx-2">
          <div v-if="selectedOption === 'option1'" class="img-upload mb-4">
            <div v-if="imageUrl" class="mb-3 d-flex justify-content-center">
              <img :src="imageUrl" class="img-thumbnail" style="max-width: 200px;">
            </div>
            <div class="upload-image">
              <!-- <label class="btn btn-outline-secondary">
                選擇商品圖片
                <input type="file" hidden @change="previewImage">
              </label> -->
              <label for="formFile" class="form-label">選擇商品圖片</label>
              <input class="form-control" type="file" id="formFile" @change="previewImage">

            </div>
          </div>
          <div class="col-md-4 col col-xl-4">
            <!-- <input v-model="newStockRecord.product_name" type="text" class="form-control" placeholder="商品名稱" aria-label="Product name"> -->
            <input class="form-control" v-model="newStockRecord.product_name" list="datalistOptions" id="exampleDataList" placeholder="商品名稱">
            <datalist id="datalistOptions">
              <option v-for="product in restockList" :key="product.id" :value="product.product_name"/>
            </datalist>

          </div>
          <div class="col-md-4 col col-xl-2">
            <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" value="option1" v-model="selectedOption" >
            <label class="btn me-3" for="option1">新商品</label>
            <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off" value="option2" v-model="selectedOption" checked>
            <label class="btn" for="option2">舊商品</label>
          </div>
          <div class="col-md-2 col col-xl-2">
            <input v-model="newStockRecord.amount" type="number" class="form-control" placeholder="數量">
          </div>
          <div class="col-md-2 col col-xl-2">
            <input v-model="newStockRecord.purchase_cost" type="text" class="form-control" placeholder="進貨成本">
          </div>
          <div class="col col-md-4 col-xl-3">
            <input v-model="newStockRecord.expire_date" type="date" class="form-control" placeholder="有效期限">
          </div>
          <div class="col col-md-3">
            <select v-model="newStockRecord.product_source" id="inputState" class="form-select" style="color: #515151;">
              <option value="" disabled>貨源</option>
              <option v-for="option in sourceOptions" :key="option.id" :value="option.name">
                {{ option.name }}
              </option>
            </select>
          </div>
          <div class="col col-md-3">
            <input v-model="newStockRecord.purchase_order_number" type="text" class="form-control" placeholder="進貨單號">
          </div>
          <div class="col">
            <BButton class="button" variant="primary" @click="handleNewStock">新增</BButton>
          </div>
        </div>
      </BCollapse>
    </div>
    <div class="table mt-5 px-3">
      <BTable striped hover :items="restockList" :fields="fields" />
    </div>
</template>

<style scoped>
.table {
  table-layout: auto;
  justify-self: center;
  text-align: center;
}
/* .img-upload > div {
  display: flex;
  justify-content: center;
} */
.restock-btn {
  background-color: #EED19C;
  border: 0;
  color: #5C4033;
}
.upload-image {
  width: 80%;
  display: grid;
}
.add-stock-area {
    display: block;
    .col:not(:last-child){
      margin-bottom: 10px;
    }
    .col:last-child {
      display: flex;
      justify-content: center;
    }
  }
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .add-stock-area {
    display: flex;
    .col:last-child {
      display: block;
    }
  }
}
@media screen and (min-width: 1025px) {
  .add-stock-area {
    display: flex;
    .col:last-child {
      display: block;
    }
  }
  .table{
    width: 80%;
  }
}
</style>
