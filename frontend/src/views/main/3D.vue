<template>
  <v-container fluid>
    <Scene>
  <Camera type="arcRotate"></Camera>
  <Entity>
    <Animation property="rotation.y" :duration="5" :end="Math.PI*2"></Animation>
    <DirectionalLight specular="#0F0" diffuse="F00" :direction="[2,0,100]"></DirectionalLight>
  </Entity>
  <Box :position="[-2,0,0]">
    <Material diffuse="#ffffff"></Material>
  </Box>
  <IcoSphere :position="[1.3,0,0]">
    <Material diffuse="#FF0"></Material>
    <Animation property="rotation.x" :duration="3" :end="Math.PI * 2"></Animation>
    <Animation property="rotation.y" :duration="3" :end="Math.PI * 2"></Animation>
  </IcoSphere>
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
import {
  Entity,
  Scene,
  Box,
  DirectionalLight,
  Animation,
  PointLight,
  IcoSphere,
  Camera,
  Material,
} from 'vue-babylonjs';
@Component ({
  mixins: [Entity],
  components: {
    Entity,
    Scene,
    Box,
    DirectionalLight,
    Animation,
    PointLight,
    IcoSphere,
    Camera,
    Material,
  },
})
export default class Dashboard extends Vue {
    public file = '';
    public size = 2;
    public position = [0, 0, 5];

}
</script>
