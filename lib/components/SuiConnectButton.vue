<template>

  <div class="sui-login-wrapper">

    <div v-if="showInformationText" v-show="hasWalletPermissions" class="sui-account-details">
        <p class="wallet-text">
          {{connectedWalletText}}: {{suiProvider}}
        </p>
        <p class="address-text">
          {{addressText}}: {{suiAddress}}
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
                       :no-wallet-extension-installed="noWalletExtensionInstalled"
                       @closeModal="toggleWalletAuthModal = false;"></sui-connect-modal>
  </div>

</template>
<script setup>

import {computed, ref} from "vue";
import SuiConnectModal from "./SuiConnectModal.vue";
import {useSuiWallet} from "../composables/useSuiWallet";


const props = defineProps({
  /*
    Determines if the modal will instantly show upon rendering the button.
    Default value is false
   */
  startToggled: {
    type: Boolean,
    default: false
  },
  /*
    It determines whether to show information about the wallet that is connected
    as well as the address of the user on the left of the button.
    Default value is true.
 */
  showInformationText:{
    type: Boolean,
    default: true
  },
    /*
      The following ones are text based that control the actual words used in the component
   */
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
  },
  noWalletExtensionInstalled:{
    type: String,
    default: 'No wallet extensions found. Maybe try Sui\'s default one?'
  }
})

const toggleWalletAuthModal = ref(props.startToggled);
const {suiWallet, suiAddress, suiProvider} = useSuiWallet();

const hasWalletPermissions = computed(()=>{
  return !!suiAddress.value
});

const logout = () => {
  suiAddress.value = null;

  suiWallet.logout().then(()=>{
    suiWallet.activeProvider = null; // clear activeProvider too.
  }).catch(); // logout.
}

// This one verifies that the logged in state is actually valid by
// trying to re-login the user upon login. It actually re-initializes the state
// with the current active address & Provider.
const verifyLoggedInStatus = () => {

  if(!suiWallet.activeProvider) return;

  // console.info('There is an active wallet connection from previous session. Attempting to re-establish.');

  // login with current provider.
  suiWallet.login().then(res=>{
    if(res.error) return logout();
    suiAddress.value = res.account;
  }).catch(e => {
    logout(); // logout if we fail the re-connect phase.
  })
}

verifyLoggedInStatus();


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