<template>
  <v-container fluid>
    <Scene>
      <Box
              :position="position"
              :scaling="[size, size, size]"
      ></Box>
    </Scene>
    <v-divider></v-divider>
    <v-text-field
      v-model="size"
      type="number"
      label="Size"
    ></v-text-field>

    <v-text-field
      v-model="position[0]"
      type="number"
      label="X"
    ></v-text-field>
    <v-file-input
        accept="image/*"
        v-model="file"
        label="File input"
      ></v-file-input>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Entity, Scene, Box } from 'vue-babylonjs';
@Component ({
  mixins: [Entity],
  components: { Scene, Box },
})
export default class Dashboard extends Vue {
    public file = '';
    public size = 2;
    public position = [0, 0, 5];

}
</script>
