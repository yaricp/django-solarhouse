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
      <v-card>{{ hour }} - {{ sun_position }}</v-card>
      <v-slider
      hint="Im a hint"
      max="24"
      min="0"
      v-model="hour"
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
import SunCalc from 'suncalc';
import { vector_from_sun_position } from '@/utils/utils'
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
    public logitude = 82.9346
    public latitude = 55.0415
    public Y = 10
    public Z = 0

    get sun_position() {
         let today = new Date();
         let datetime = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            this.hour,
            0,
            0);
         console.log(this.hour)
         const sunPos = SunCalc.getPosition(
            datetime,
            this.latitude,
            this.logitude
         );
        console.log(sunPos)
        const vector = vector_from_sun_position(sunPos, 10);
        console.log(vector);
        return  vector;
    }

    public load() {
      SceneLoader.Append('');
    }

    public onScene (scene) {
      var babylon = this.BABYLON
      var engine = scene.getEngine()
      var filesInput = new babylon.FilesInput(
        engine,
        null,
        scene,
        null,
        null,
        null,
        function () { babylon.Tools.ClearLogCache() },
        null,
        null
      )

      this.filesInput = filesInput
      this.myScene = scene
    }
}
</script>
