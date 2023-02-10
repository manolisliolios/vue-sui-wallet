<template>
  <div class="modal-wrap">
    <div class="modal-backdrop " @click="$emit('closeModal')"></div>
    <div class="modal" :class="bodyClasses">
      <div v-html="x_btn" class="close-btn ease-in-out duration-300"
           @click="$emit('closeModal')"></div>
      <p class="text-center mb-6">{{ chooseProvider }}</p>
      <button v-for="provider in suiWallet.suiWalletProviders" :key="provider.key"
              class="provider-btn ease-in-out duration-300" @click="requestWalletAccess(provider.key)">
        <span v-html="provider.logo" class="logo-icon"></span>
        {{ connect }} {{provider.title}}
      </button>

      <p v-if="error" class="error">
        {{error}}
      </p>

    </div>

  </div>


</template>

<style>
.ease-in-out{
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.duration-300{
  transition-duration: 300ms;
}
.error{
  color:#dc2626;
  text-align: center;
}
.provider-btn{
  display: flex;
  padding: 0.75rem 1.25rem;
  margin: 0.75rem 0;
  background-color: #E5E7EB;
  justify-content: center;
  align-items: center;
  width: 100%;
  border:0;
  cursor:pointer;
  border-radius: 0.5rem;
}
.provider-btn:hover{
  filter:brightness(95%);
}
.logo-icon svg{
  width: 20px;
  height: 20px;
}
.modal-wrap{
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
}
.modal-backdrop{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #00000030;
}
.modal{
  position: relative;
  z-index:2;
  padding: 2.5rem;
  background-color: #ffffff;
  width: 90%;
  border-radius: 0.5rem;
}
@media screen and (min-width: 767px) {
  .modal{
    width:30%;
  }
}
.close-btn{
  z-index:1;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
}
.close-btn:hover{
  transform: rotate(12deg);
  --transform-rotate: 12deg;
}
</style>

<script setup>
import {x_btn} from "./icons";
import {useSuiWallet} from "../composables/useSuiWallet";
import {ref} from "vue";

const emit = defineEmits(['closeModal']);

const error = ref(null);
const props = defineProps({
  bodyClasses: String,
  connect: String,
  chooseProvider: String
})

const suiWallet = useSuiWallet();

// request wallet access from injected helper
// and assign the active state to global provided variables to maintain vue state
const requestWalletAccess = (provider)=>{
  error.value = null // reset error
  suiWallet.provider.value = provider;

  suiWallet.requestWalletPermissions({
    provider: suiWallet.provider.value,
    walletProviders: suiWallet.suiWalletProviders
  }).then(res=>{

    if(res.error){
      error.value = res.error;
      return;
    }
    suiWallet.account.value = res.userAddress;
    suiWallet.provider.value = res.provider;
    emit('closeModal');
  })

};


</script>
