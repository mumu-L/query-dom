<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
  <a-form-item label="根据">
      <a-radio-group v-model:value="formState.type">
        <a-radio-button value="id">id</a-radio-button>
        <a-radio-button value="class">class</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      label="元素名"
      name="name"
      :rules="[{ required: true, message: '请输入元素名' }]"
    >
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item
      label="key"
      name="key"
      :rules="[{ required: true, message: '请输入元素名' }]"
    >
      <a-input v-model:value="formState.key" />
    </a-form-item>
    <a-form-item
      label="value"
      name="value"
      :rules="[{ required: true, message: '请输入元素名' }]"
    >
      <a-input v-model:value="formState.value" />
    </a-form-item>
    <a-form-item
      label="结果"
      name="textarea2"
    >
     <a-textarea v-model:value="formState.textarea" placeholder="textarea with clear icon" allow-clear />
    </a-form-item>
<!-- 
    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
    </a-form-item> -->

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit" id="submitBtn" @click="isClick()">Submit</a-button>
    </a-form-item>
  </a-form>
  <code  id="text"></code>
  
</template>

<script setup lang="ts">
import { reactive } from "vue"

//数据
let formState=reactive({
    type:'id',
    name:'',
    key:'',
    value:'',
    textarea:''
})

let isClick =  async ()=>{
  console.log('isClick')
  let [tab] =  await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.storage.sync.set({ formState });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: ()=>{

      chrome.storage.sync.get('formState',({ formState }) => {
          let obj = {}
          if(formState.type=='id'){
            let getEl = document.getElementById(formState.name).getElementsByTagName('option')
            for(let i = 0;i<getEl.length;i++){
              obj[getEl[i].getAttribute('value')] = getEl[i].label
            }
            
          }
          console.log(obj)
          // if(formState.type=='class'){
          //   let getEl = document.getElementByClassName(formState.name).innerHTML
          // }
          chrome.storage.sync.set({ el:obj });
      })
    },
  });
  chrome.storage.sync.get('el',({ el }) => {
    // console.log(el)
    // const obj ={}
    // let keys = el.match(`/${formState.key}/g`)
    // let values = el.match(`/${formState.value}/g`)
    // keys.forEach((f,i)=>{
    //   obj[f] = values[i]
    // })
    // for(let (k,i) in keys){
      
    // }
    formState.textarea = JSON.stringify(el)
    document.getElementById('text').innerHTML=JSON.stringify(el)
    // document.getElementById('text').text = el
  })
  
}

// let btn =document.getElementById('submitBtn')
// btn.addEventListener('click',async () =>{
//     console.log('click')
//   let [tab] =  await chrome.tabs.query({ active: true, currentWindow: true });

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: query,
//   });
// })
function query(){
  console.log("quey")
  console.log(formState)
  if(formState.type=='id'){
    
    console.log(formState.type)
    console.log(formState.name)
    const el = document.getElementById(formState.name)


    console.log(el)
    document.getElementById('text').append(el)
  }
  
}
</script>

<style>

</style>