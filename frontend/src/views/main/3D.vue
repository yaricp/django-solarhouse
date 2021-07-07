<template>
  <v-container fluid>
    <Scene>
      <Camera type="arcRotate"></Camera>
        <PointLight :position="sun_position" specular="#FF0000"></PointLight>
        <Plane :position="[0,0,0]" :scaling="[0,10,0]" :rotate="[45,45,0]"></Plane>
        <IcoSphere :position="[0,0,0]" :scaling="[1,1,1]">
        <Material diffuse="#FF0"></Material>
      </IcoSphere>
</Scene>
    <v-divider></v-divider>
      <v-card>{{ hour }} - {{ Sun.position }}</v-card>
      <v-slider
      hint="Im a hint"
      max="24"
      min="0"
      v-model="hour"
      @change="changeHour"
    ></v-slider>
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
        @onload="load"
      ></v-file-input>
  </v-container>
</template>

<script lang="ts">
import { sunVector } from "@/utils/solar";
import { Component, Vue, Watch } from 'vue-property-decorator';
import {
  Entity,
  Scene,
  Plane,
  DirectionalLight,
  Vector3,
  Animation,
  PointLight,
  IcoSphere,
  Camera,
  Material,
  SceneLoader,
} from 'vue-babylonjs';
@Component ({
  mixins: [Entity],
  components: {
    Entity,
    Scene,
    Plane,
    DirectionalLight,
    Animation,
    PointLight,
    IcoSphere,
    Camera,
    Material,
  },
})


export default class DScene extends Vue {
    public file = ''
    public size = 2
    public hour = 0
    public position = [0, 0, 5]
    public Sun = {
        specular: "#0F0",
        diffuse: "F00",
        direction: [0, 0, 100],
        position: [10,10,0]
    }

    computed: {
        sun_position() {
             console.log(e);
             const vector = sunVector(this.hour, true)
             const x = vector[0][0] * 10;
             const y = vector[1][0] * 10;
             const z = vector[2][0] * 10;
             return  [x, y, z];
        }
    }

    public load() {
      SceneLoader.Append('');
    }

    public onScene (scene) {
      var babylon = this.BABYLON
      var engine = scene.getEngine()
      var filesInput = new babylon.FilesInput(engine, null, scene, null, null, null, function () {
        babylon.Tools.ClearLogCache()
      }, null, null)
      filesInput.onProcessFileCallback = function (file, name, extension) {
        console.log('done: ' + (typeof file) + ' ' + name + ' ' + extension)
        return true
      }
      this.filesInput = filesInput
      this.myScene = scene
    }

}
</script>
