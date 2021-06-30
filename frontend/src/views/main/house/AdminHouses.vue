<template>
  <div>
    <v-toolbar light>
      <v-toolbar-title>
        Manage Users
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/main/house/houses/create">Create House</v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="houses">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.email }}</td>
        <td>{{ props.item.full_name }}</td>
        <td><v-icon v-if="props.item.is_active">checkmark</v-icon></td>
        <td><v-icon v-if="props.item.is_superuser">checkmark</v-icon></td>
        <td class="justify-center layout px-0">
          <v-tooltip top>
            <span>Edit</span>
            <v-btn slot="activator" flat :to="{name: 'main-admin-houses-edit', params: {id: props.item.id}}">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-tooltip>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { IHouseProfile } from '@/interfaces/house';
import { readAdminHouses } from '@/store/house/getters';
import { dispatchGetHouses } from '@/store/house/actions';

@Component
export default class AdminHouses extends Vue {
  public headers = [
    {
      text: 'Name',
      sortable: true,
      value: 'name',
      align: 'left',
    },
    {
      text: 'Email',
      sortable: true,
      value: 'email',
      align: 'left',
    },
    {
      text: 'Full Name',
      sortable: true,
      value: 'full_name',
      align: 'left',
    },
    {
      text: 'Is Active',
      sortable: true,
      value: 'isActive',
      align: 'left',
    },
    {
      text: 'Is Superuser',
      sortable: true,
      value: 'isSuperuser',
      align: 'left',
    },
    {
      text: 'Actions',
      value: 'id',
    },
  ];
  get houses() {
    return readAdminHouses(this.$store);
  }

  public async mounted() {
    await dispatchGetHouses(this.$store);
  }
}
</script>
