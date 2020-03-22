<template>
  <v-app>
    <v-content>
      <v-toolbar color="#ededed" elevation="0">
        <v-toolbar-title>
          <v-img :src="require('./assets/livelane.png')" class="mr-3" contain width="150px" />
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </v-toolbar>

      <router-view></router-view>
      <v-footer absolute class="font-weight-medium">
        <v-container fluid>
          <v-row justify="center" class="mb-1">
            <v-col :lg="3" justify="center" align="center">
              <router-link :to="{name: 'Home'}">
                <i class="icon-livelane_mobil_icons_home"></i>
              </router-link>
            </v-col>
            <v-col :lg="3" align="center">
              <i class="icon-livelane_mobil_icons_map"></i>
            </v-col>
            <v-col :lg="3" align="center">
              <router-link :to="{name: 'Supermarkets'}">
                <i class="icon-livelane_mobil_icons_search"></i>
              </router-link>
            </v-col>
            <v-col :lg="3" align="center">
              <i class="icon-livelane_mobil_icons_qr"></i>
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    HelloWorld
  },

  data: () => ({
    //
  })
};
</script>

<style scoped>
body {
  font-family: "Montserrat";
}
i {
  font-size: 1.9rem;
  color: rgba(0, 126, 127, 1);
}
.v-footer .container {
  padding: 0px;
}
</style>
