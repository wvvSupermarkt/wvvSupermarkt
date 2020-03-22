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
              <v-icon color="#007e7f">house</v-icon>
            </v-col>
            <v-col :lg="3" align="center">
              <v-icon color="#007e7f">place</v-icon>
            </v-col>
             <v-col :lg="3" align="center">
              <v-icon color="#007e7f">search</v-icon>
            </v-col>
            <v-col :lg="3" align="center">
              <v-icon color="#007e7f">camera</v-icon>
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
</style>
