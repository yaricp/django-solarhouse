<template>
  <v-container fluid>
    <canvas
        id="renderCanvas"
        touch-action="none"
        style="width:100%"
    ></canvas>
    <v-divider></v-divider>
    <v-file-input
        accept="image/*"
        v-model="file"
        label="File input"
      ></v-file-input>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Dashboard extends Vue {
    public file = '';
    mounted() {
       const renderScript = document.createElement('script');
       renderScript.setAttribute('src', 'http://localhost:8080/js/bundle.js');
       document.head.appendChild(renderScript);
    }
}
</script>
