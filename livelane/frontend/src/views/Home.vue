<template>
  <div class="home" :style="{'background-image':'url(http://localhost:8080/home-bg.png)'}">
    <h1>
      FINDE HERAUS,
      <br />WIE LANG DIE
      <br />SCHLANGEN VOR
      <br />GESCHÄFTEN
      <br />IST UND CHECKE,
      <br />OB PRODUKTE
      <br />FEHLEN.
    </h1>
<br />
    <v-btn large extended color="#007e7f" class="btn-search" style="color:white;font-weight:600!important;">Primary</v-btn>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {}
};
</script>

<style scoped>


h1 {
  font-weight: semi-bold;
  color: rgba(0%, 0%, 0%, 40%);
  font-size: 40px;
  line-height:1.2;
  letter-spacing:0.5pt;
}

.home {
  padding:10px;
}

.v-btn.btn-search span{
  color:white;
  font-weight:semi-bold;
}

.v-btn.v-size--default, .v-btn.v-size--large {

    font-size: 1.375rem;
    font-weight: 900;

}
</style>
