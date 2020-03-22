<template>
  <div class="supermarkets">
    <Supermarkets />
  </div>
</template>

<script>
// @ is an alias to /src
import Supermarkets from "@/components/Supermarkets.vue";

export default {
  name: "Home",
  components: {
    Supermarkets
  }
};
</script>

<style scoped>
.supermarkets {
  font-family: "Montserrat";
}
</style>
