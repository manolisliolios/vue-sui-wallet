<template>

  <div class="sui-login-wrapper">

    <div v-if="showInformationText" v-show="hasWalletPermissions" class="sui-account-details">
        <p class="wallet-text">
          {{connectedWalletText}}: {{suiWallet.provider}}
        </p>
        <p class="address-text">
          {{addressText}}: {{suiWallet.account}}
        </p>
    </div>

    <button v-if="!hasWalletPermissions"
            class="sui-login-button"
            @click="toggleWalletAuthModal = true">
      {{ connectText }}
    </button>

    <button v-else class="sui-logout-btn" @click="logout">
      {{ logoutText }}
    </button>

    <sui-connect-modal v-show="toggleWalletAuthModal"
                       :connect="connect"
                       :choose-provider="chooseProvider"
                       @closeModal="toggleWalletAuthModal = false;"></sui-connect-modal>
  </div>

</template>
<script setup>

import {computed, inject, onMounted, onUnmounted, ref} from "vue";
import SuiConnectModal from "./SuiConnectModal.vue";
import {useSuiWallet} from "../composables/useSuiWallet";


const props = defineProps({
  showInformationText:{
    type: Boolean,
    default: true
  },
  connectedWalletText:{
    type: String,
    default: "Connected Wallet"
  } ,
  addressText: {
    type: String,
    default: "Address"
  },
  connectText:{
    type: String,
    default: "Connect Your Wallet"
  },
  logoutText:{
    type: String,
    default: "Logout"
  } ,
  chooseProvider: {
    type: String,
    default: "Select wallet provider:"
  },
  connect: {
    type: String,
    default: ""
  }
})

const toggleWalletAuthModal = ref(false);
const suiWallet = useSuiWallet();

const hasWalletPermissions = computed(()=>{
  return !!suiWallet.account.value
});

const verifyWalletPermissions = () => {
  suiWallet.verifyPermissions().then((status)=>{
    if(!status.isLoggedIn) logout();

  });
}

onMounted(()=>{
  // we verify wallet permissions after window has loaded to make sure that
  // the wallet extensions have received their state and window[walletProvider] doesnt return undefined.
  window.addEventListener('load', verifyWalletPermissions);
});

onUnmounted(()=>{
  window.removeEventListener('load', verifyWalletPermissions);
})

const logout = () => {
  suiWallet.provider.value = null;
  suiWallet.account.value = null;
  suiWallet.logout();
}
</script>

<style scoped>
.sui-account-details{
  margin-right:1rem;
  margin-bottom:1rem;
}

.sui-login-wrapper{
  display:block;
  text-align: center;
}

@media screen and (min-width: 767px) {
  .sui-account-details{
    margin-bottom:0;
  }
  .sui-login-wrapper{
    display:flex;
    text-align:left;
  }
}
.sui-login-wrapper > *{
  flex-shrink: 0;
}
.sui-logout-btn{
  flex-shrink: 0;
  padding: 0.5rem 0.75rem;
  background-color: transparent;
  color: #111827;
  cursor:pointer;
  border:1px solid #111827;
  border-radius: 9999px;
  min-width:160px;
}
.wallet-text{
  font-size:0.8rem;
  margin:0;
}
.address-text{
  margin:0;
  font-size: 0.6rem;
}
.sui-login-button{
  flex-shrink: 0;
  background: #1f2937;
  display: flex;
  cursor:pointer;
  box-shadow:none!important;
  align-items: center;
  text-align: center;
  /*margin:0 auto;*/
  justify-content: center;
  color:white;
  padding: 7px 12px;
  border-radius:99px;
  min-width:160px;
}
</style>