<template>
  <div class="container-fluid">
    <h1>Clientes</h1>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Dirección</th>
            <th scope="col">Propiedad</th>
            <th scope="col">Ultima modificación</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(client, index) in clients" :key="index">
            <td>{{ client.id }}</td>
            <td>{{ client.name }}</td>
            <td>{{ client.email }}</td>
            <td>{{ client.address }}</td>
            <td></td>
            <td>{{ client.updated_at }}</td>
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
    if (this.$store.getters.allClients.length === 0) {
      this.$store.dispatch('getClients')
    }
  },
  computed: {
    clients() {
      return this.$store.getters.allClients
    },
  },
}
</script>

<style lang="css" scoped>
</style>
