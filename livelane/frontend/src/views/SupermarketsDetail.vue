<template>
  <div class="supermarketsdetail">
      <SupermarketsDetail />
 
  </div>
</template>

<script>
// @ is an alias to /src
import SupermarketsDetail from "@/components/SupermarketsDetail.vue";

export default {
  name: "Home",
  components: {
    SupermarketsDetail
  }
};
</script>

<style scoped>
    .supermarkets{
        font-family: 'Montserrat';
    }
</style>
