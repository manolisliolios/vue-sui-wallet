<template>
  <div class="modal-wrap" @keydown.esc="$emit('closeModal')">
    <div class="modal-backdrop " @click="$emit('closeModal')"></div>
    <div class="modal" :class="bodyClasses">
      <div v-html="x_btn" class="close-btn ease-in-out duration-300"
           @click="$emit('closeModal')"></div>
      <p class="text-center mb-6">{{ chooseProvider }}</p>
      <button v-for="provider in wallet.walletProviders" :key="provider.key"
              class="provider-btn ease-in-out duration-300" @click="requestWalletAccess(provider)">
        <img :src="provider.icon" class="logo-icon">
        {{ connect }} {{provider.name}}
      </button>

      <div v-if="wallet.walletProviders.length === 0 " class="no-extensions-installed">
        {{noWalletExtensionInstalled}}
        <a href="https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil"
           target="_blank">Sui Wallet</a>
      </div>

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
.no-extensions-installed{
  text-align: center;
}
.logo-icon{
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.modal-wrap{
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index:9999;
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
  border-radius: 2rem;

  max-height:60%;
  overflow-y:auto;
}
@media screen and (min-width: 767px) {
  .modal{
    width:30%;
  }
}
.close-btn{
  z-index:1;
  background-color:#e5e7eb;
  color:#111827;
  border-radius:100%;
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  display:flex;
  padding:.3rem;
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
  chooseProvider: String,
  noWalletExtensionInstalled: String
})

const wallet = useSuiWallet();

// request wallet access from injected helper
// and assign the active state to global provided variables to maintain vue state
const requestWalletAccess = (provider)=>{
  error.value = null // reset error
  wallet.suiWallet.login(provider).then(res=>{

    if(!res || res?.error){
      error.value = res.error;
      return;
    }
    wallet.suiWallet.activeProvider = res.provider;
    wallet.suiProvider.value = res.provider.name;
    wallet.suiAddress.value = res.account;
    emit('closeModal');
  }).catch(e=>{
    console.log('error:' +e);
  })

};
</script>
