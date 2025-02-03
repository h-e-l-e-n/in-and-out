<script setup>

</script>

<template>
  <BNavbar style="background-color: #D9C3A5;">
    <h3 class="mb-0" style="color: #6F5E4D;">💰賣家小世界</h3>
      <BNavbarNav>
        <BButton pill class="nav-buttons" style="background-color: #EED19C;">進貨</BButton>
        <BButton pill class="nav-buttons" style="background-color: #EFB28C;">庫存</BButton>
        <BButton pill class="nav-buttons" style="background-color: #E8837E;">訂單</BButton>
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
  margin-right: 1rem;
}

</style>
