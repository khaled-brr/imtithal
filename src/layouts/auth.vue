<template>
  <v-locale-provider rtl>
    <v-app>
      <v-container fluid class="pa-0">
        <v-layout>
          <v-main>
            <router-view v-slot="{ Component }">
              <transition name="scale" mode="out-in">
                <component :is="Component"></component>
              </transition>
            </router-view>
          </v-main>
        </v-layout>
      </v-container>
    </v-app>
  </v-locale-provider>
</template>

<style lang="scss" scoped>
body .v-main {
  --v-layout-top: 0 !important;
}
</style>
