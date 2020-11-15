<template>
  <v-app>
    <v-app-bar
      app
      elevate-on-scroll
    >
     <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-img
          alt="Vuetify Logo"
          class="shrink text-center mx-auto"
          contain
          src="/images/logo.png"
          transition="scale-transition"
          width="200"
      
        />


      <v-btn icon v-if="token === null">
        <v-icon @click="loginScreen()">mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list-item>

        <v-list-item-content>
          <v-list-item-title>Michael Keller</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :href="'/'+item.title+'/'"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    drawer: null,
    token: localStorage.getItem('token'),
    items: [
      { title: 'Home', icon: 'mdi-home' },
      { title: 'Alerts', icon: 'mdi-bell-alert' },
      { title: 'Guests', icon: 'mdi-account' },
      { title: 'Groups', icon: 'mdi-account-group' },
    ],
    methods: {
      loginScreen: function () {
        location.href='/login/'
      }
    },
  }),
};
</script>
