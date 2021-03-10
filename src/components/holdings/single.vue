<template>
  <div class="">
    <h1>Propiedad #{{ holding.id }} - {{holding.name}}</h1>
    <form class="" @submit.prevent="">
      <div class="row g-3">
        <div class="col">
          <input type="text" class="form-control" placeholder="Título de la Propiedad:" v-model="holding.name" id="title" aria-describedby="title">
        </div>
        <div class="col">
          <input type="text" class="form-control" placeholder="Precio:" v-model="holding.price" id="price" aria-describedby="price">
        </div>
        <div class="mb-3 col">
          <label for="description" class="form-label">Descripción:</label>
          <Editor :initial-content="holding.ad_description"
            :active-buttons="[
                'bold',
                'italic',
                'strike',
                'underline',
                'code',
                'paragraph',
                'h1',
                'h2',
                'h3',
                'bullet_list',
                'ordered_list',
                'blockquote',
                'code_block',
                'horizontal_rule',
                'undo',
                'redo',
              ]" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Editor from '../editor'

export default {
  components: {
    Editor
  },
  data(){
    return {
      loading: true,
    }
  },
  mounted() {
    this.$store.dispatch('getSingleHolding', this.$route.params.id)
  },
  computed: {
    holding() {
      return this.$store.getters.singleHolding
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
