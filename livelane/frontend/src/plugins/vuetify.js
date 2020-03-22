import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

const MY_ICONS = {
    home: 'icon-livelane_mobil_icons_home',
    map: 'icon-livelane_mobil_icons_map',
    menu: 'icon-livelane_mobil_icons_menu',
    qr: 'icon-livelane_mobil_icons_qr', // delete (e.g. v-chip close)
    search: 'icon-livelane_mobil_icons_search',
    trash: 'icon-livelane_mobil_icons_trash',
    warnunggruen: 'icon-livelane_mobil_icons_warnunggruen',
    warnungorange: 'icon-livelane_mobil_icons_warnungorange',
    warnungrot: 'icon-livelane_mobil_icons_warnungrot',
    x: 'icon-livelane_mobil_icons_x',
    zeitgruen: 'icon-livelane_mobil_icons_zeitgruen',
    zeitorange: 'icon-livelane_mobil_icons_zeitorange',
    zeitrot: 'icon-livelane_mobil_icons_zeitrot'
}

export default new Vuetify({
    icons: {
        values: MY_ICONS,
    },
});
