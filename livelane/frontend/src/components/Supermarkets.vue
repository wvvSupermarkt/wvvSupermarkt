<template>
  <v-container>
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
