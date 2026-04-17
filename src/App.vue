<template>
  <RouterView />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@100;200;300;400;500;600;700&display=swap');
// src: url(@/assets/fonts/Montserrat-Arabic-Regular.ttf);
// @font-face {
//   font-family: 'Montserrat Arabic';
//   src: url(@/assets/fonts/IBMPlexArabic/IBMPlexArabic.ttf);
//   font-weight: 400;
// }

.ibm-plex-sans-arabic {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 400;
  font-style: normal;
}

#app {
  height: 100vh;
  overflow: hidden;
}

html {
  overflow-y: initial;
  font-family: 'IBM Plex Sans Arabic', sans-serif !important;
}

html,
body {
  * {
    font-family: 'IBM Plex Sans Arabic', sans-serif;
    font-weight: 400;
    box-sizing: border-box;
  }

  text.apexcharts-datalabel-value {
    font-weight: bold !important;
  }

  .v-card-title,
  .v-card-title *,
  .text-h1,
  .text-h2,
  .text-h3,
  .text-h4,
  .text-h5,
  .text-h6,
  tspan {
    font-family: 'IBM Plex Sans Arabic', sans-serif !important;
    font-weight: 400;
  }

  .vue-apexcharts {
    text {
      fill: #fff !important;
    }

    line {
      stroke: #3d3b3a !important;
    }

    .apexcharts-menu {
      background: rgb(34, 32, 30);
      border: none;
      box-shadow: 0 5px 20px rgba(255, 255, 255, 0.1);
    }

    .apexcharts-theme-light .apexcharts-menu-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .apexcharts-xaxis-texts-g tspan {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
}

body .v-list-item-title {
  white-space: initial;
  text-overflow: initial;
}
</style>
