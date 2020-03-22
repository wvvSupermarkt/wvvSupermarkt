<template>
  <v-container fluid>
    <v-toolbar color="#ededed" elevation="0">
      <v-text-field
        label="Suche"
        :v-model="search"
        single-line
        solo
        flat
        style="font-weight:600;color:rgba(237, 237, 237, 0.4);"
      ></v-text-field>
    </v-toolbar>
    <v-simple-table dense fixed-header>
      <thead>
        <tr>
          <th>Name</th>
          <th class="wartezeit">Wartezeit</th>
          <th>Sortiment</th>
          <th>Entfernung</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in supermarkets" :key="item.place_id" @click="goToSupermarketDetail(item)">
          
          <td>
            <b>{{ item.name }}</b>
            <br />
            <sub>{{ item.formatted_address }}</sub>
          </td>
          <td align="center">
            <i v-bind:class="getOccupancyIcon(item.occupancy)"></i>
          </td>
          <td align="center">
            <i v-bind:class="getStockIcon(item.articles)"></i>
          </td>
          <td align="center">100m</td>
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
    supermarkets: [],
    search: ""
  }),
  mounted() {
    axios
      .get(
        "https://api.livelane.de/supermarket/place/?lat=49.3831945&long=8.3930197"
      )
      .then(response => {
        this.supermarkets = response.data;
      });
  },
  computed: {},
  methods: {
    getOccupancyIcon(occupancy) {
      if (occupancy === 1) {
        return "icon-livelane_mobil_icons_zeitgruen";
      } else if (occupancy === 2) {
        return "icon-livelane_mobil_icons_zeitorange";
      } else {
        return "icon-livelane_mobil_icons_zeitrot";
      }
    },
    getStockIcon(articles) {

      if (articles.length === 0) {
        return "icon-livelane_mobil_icons_warnunggruen";
      } else if (articles.length > 1) {
        return "icon-livelane_mobil_icons_warnungorange";
      } else if (articles.length > 3) {
        return "icon-livelane_mobil_icons_warnungrot";
      }
    },
    goToSupermarketDetail(supermarket){
      this.$router.push({ name: 'SupermarketsDetail', params: { supermarketdetails: supermarket}})
    }
  }
};
</script>

<style scoped>
.container.container--fluid {
  padding: 0;
}

.v-data-table td,
.v-data-table th {
  padding: 0 11px;
}

.v-data-table th {
  color: #007e7f !important;
  background-color: #ededed !important;
}

.v-data-table thead tr {
  background-color: #ededed !important;
}

.v-data-table thead tr th {
  border-bottom: 3px solid #007e7f !important;

  color: rgba(0, 126, 127, 0.5) !important;
}

.v-data-table tbody tr td {
  border-bottom: 2px solid rgba(0, 126, 127, 0.4) !important;
  padding-top: 5px;
  padding-bottom: 5px;
}
.v-data-table thead tr th.wartezeit {
  color: rgba(0, 126, 127, 1) !important;
}

.v-data-table tbody tr:nth-child(even) td {
  background-color: rgba(0, 126, 127, 0.1) !important;
}

i {
  font-size: 2.5rem;
}

i.icon-livelane_mobil_icons_zeitgruen {
  color: #084f00;
}
i.icon-livelane_mobil_icons_zeitorange {
  color: #ad4d17;
}
i.icon-livelane_mobil_icons_zeitrot {
  color: #880e0e;
}

i.icon-livelane_mobil_icons_warnunggruen {
  color: #084f00;
}
i.icon-livelane_mobil_icons_warnungorange {
  color: #ad4d17;
}
i.icon-livelane_mobil_icons_warnungrot {
  color: #880e0e;
}
</style>