<template>
  <v-container fluid>
    <v-row>
      <v-col :lg="12">
        <span class="supermarket-name">
          <b>{{supermarket.name}}</b>
        </span>
        <br />
        <sub class="supermarket-address">{{supermarket.formatted_address}}</sub>
        <br />
        <br />
        <h4>Wartezeit</h4>
        <i v-bind:class="getOccupancyIcon(supermarket.occupancy)"></i>
      </v-col>
    </v-row>
    <v-row>
      <v-col :lg="12">
        <h4>Liste fehlender Produkte</h4>
        <ul>
          <li v-for="article in supermarket.aticles" :key="article.hash">{{article.name}} <span style="color:red;">X</span></li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import supermarkets_json from "./dummy_data.json";
export default {
  name: "SupermarketsDetail",

  data: () => ({
    supermarket: supermarkets_json.supermarkets[0]
  }),
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
      var stock = Math.floor(Math.random() * 3) + 1;
      if (stock === 1) {
        return "icon-livelane_mobil_icons_warnunggruen";
      } else if (stock === 2) {
        return "icon-livelane_mobil_icons_warnungorange";
      } else {
        return "icon-livelane_mobil_icons_warnungrot";
      }
    }
  }
};
</script>

<style scoped>
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