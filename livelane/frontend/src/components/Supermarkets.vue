<template>
   
  <v-container fluid>
    <v-toolbar color="#ededed" elevation="0">
        <v-text-field
            label="Suche"
            single-line
            solo
            flat
            dense 
            style="font-weight:600;color:rgba(237, 237, 237, 0.4);"
          ></v-text-field>
    </v-toolbar>
   

    <v-simple-table>
      <thead>
        <tr>
          <th></th>
          <th>Wartezeit</th>
          <th>Sortiment</th>
          <th>Entfernung</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in supermarkets.supermarkets" :key="item.name">
          <td>{{ item.name }}<br /><sub>{{ item.formatted_address }}</sub></td>
          <td>{{ item.occupancy}}</td>
          <td>Fehlend:<br />
            <ul>
                
                <li v-for="article in item.aticles" v-if="article.availability === 0" :key="article.hash">{{article.name}}</li>
            </ul>
          </td>
          <td>
            -
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
import supermarkets_json from "./dummy_data.json";
export default {
  name: "Supermarkets",

  data: () => ({
    supermarkets: supermarkets_json
  })
};
</script>

<style scoped>
.container.container--fluid{
    padding:0;
}
</style>