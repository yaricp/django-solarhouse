<template>
  <v-container fluid>
    <v-card class="ma-3 pa-3">
      <v-card-title primary-title>
        <div class="headline primary--text">Create House</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field label="Name" v-model="name" required></v-text-field>
            <v-text-field
                label="File"
                type="file"
                v-model="file"
                required></v-text-field>
          </v-form>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel">Cancel</v-btn>
        <v-btn @click="reset">Reset</v-btn>
        <v-btn @click="submit" :disabled="!valid">
              Save
            </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  IHouseProfile,
  IHouseProfileUpdate,
  IHouseProfileCreate,
} from '@/interfaces/house';
import { dispatchGetHouses, dispatchCreateHouse } from '@/store/house/actions';

@Component
export default class CreateHouse extends Vue {
  public valid = false;
  public name: string = '';
  public file: string = '';

  public async mounted() {
    await dispatchGetHouses(this.$store);
    this.reset();
  }

  public reset() {
    this.name = '';
    this.file = '';
  }

  public cancel() {
    this.$router.back();
  }

  public async submit() {
    if (await this.$validator.validateAll()) {
        const updatedProfile: IHouseProfileCreate = {
            name: this.name,
            file: this.file,
          };
        await dispatchCreateHouse(this.$store, updatedProfile);
        this.$router.push('/main/house/houses');
    }
  }
}
</script>
