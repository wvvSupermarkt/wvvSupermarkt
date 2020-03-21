<template>
  <div class="supermarkets">
    <v-card max-width="500" class="mx-auto">
      <Supermarkets />
    </v-card>
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
