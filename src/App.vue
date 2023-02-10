<script setup>


import {SuiConnectButton, useSuiWallet} from "../lib/main";

const {suiWallet} = useSuiWallet();

const wallet = suiWallet();


</script>

<template>
  <div style="justify-content: end;display:flex;">
    <sui-connect-button></sui-connect-button>
  </div>
</template>

