<script setup>
import router from '@/router';
import { ref, onMounted, onUnmounted } from 'vue';

const isMobile = ref(window.innerWidth < 768);

const updateWidth = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});

</script>

<template>
  <BNavbar style="background-color: #D9C3A5;" :toggleable="isMobile">
    <h3 class="mb-0" style="color: #6F5E4D;">💰招財進寶</h3>
    <!-- 手機顯示側邊選單 -->
    <BNavbarToggle v-if="isMobile" target="nav-offcanvas"/>
    <BOffcanvas v-if="isMobile" id="nav-offcanvas" title="選單" placement="end" is-nav>
      <BNavbarNav>
        <BButton
        pill
        class="nav-buttons"
        style="background-color: #EED19C;"
        @click="router.push('/')"
        >進貨</BButton>
        <BButton
        pill
        class="nav-buttons"
        style="background-color: #EFB28C;"
        @click="router.push('/stock')"
        >庫存</BButton>
        <BButton
        pill
        class="nav-buttons"
        style="background-color: #E8837E;"
        @click="router.push('/order')"
        >訂單</BButton>
        <BNavItemDropdown text="User" right>
          <BDropdownItem href="#">Login</BDropdownItem>
        </BNavItemDropdown>
      </BNavbarNav>
    </BOffcanvas>
    <!-- 非手機無選單 -->
    <BNavbarNav v-if="!isMobile">
      <BButton
      pill
      class="nav-buttons"
      style="background-color: #EED19C;"
      @click="router.push('/')"
      >進貨</BButton>
      <BButton
      pill
      class="nav-buttons"
      style="background-color: #EFB28C;"
      @click="router.push('/stock')"
      >庫存</BButton>
      <BButton
      pill
      class="nav-buttons"
      style="background-color: #E8837E;"
      @click="router.push('/order')"
      >訂單</BButton>
      <BNavItemDropdown text="User" right>
        <BDropdownItem href="#">Login</BDropdownItem>
      </BNavItemDropdown>
    </BNavbarNav>


  </BNavbar>
</template>
<style scoped>
.nav-buttons {
  border: 0;
  color: #5C4033;
  margin-bottom: 1rem;
}
@media screen and (min-width: 768px) {
  .nav-buttons {
  margin-right: 1rem;
  margin-bottom: 0;
}
}

</style>
