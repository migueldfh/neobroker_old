<template>
  <div class="container-fluid">
    <h1>Sucursales</h1>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre de la sucursal</th>
            <th scope="col">Nombre cuenta principal</th>
            <th scope="col">Email</th>
            <th scope="col">Dirección</th>
            <th scope="col">Límite de Usuarios</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(venue, index) in venues" :key="index">
            <td>{{ venue.id }}</td>
            <td>{{ venue.comercial_name }}</td>
            <td>{{ venue.name }}</td>
            <td>{{ venue.email }}</td>
            <td>{{ venue.fiscal_address }}</td>
            <td>{{ venue.limit_users }}</td>
            <td><a href="#"><i class="bi-pencil" style="font-size: 1rem; color: cornflowerblue;"></i></a> <a href="#"><i class="bi-trash" style="font-size: 1rem; color: red;"></i></a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$store.getters.allVenues.length === 0) {
      this.$store.dispatch('getVenues')
    }
  },
  computed: {
    venues() {
      return this.$store.getters.allVenues
    },
  },
}
</script>

<style lang="css" scoped>
</style>
