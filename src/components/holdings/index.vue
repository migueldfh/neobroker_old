<template id="">
  <div class="container-fluid">
    <h1 style="text-center">Propiedades</h1>
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col" v-for="holding in holdings" :key="holding.id">
        <div class="card mb-2">
          <div style="position:relative">
            <swiper class="swiper" :options="swiperOption">
              <swiper-slide v-for="(holdingImage, index) in holding.images" :key="index">
                <img :src="holdingImage" style="max-width: 100%;">
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
          <div class="card-body">
            <h4 class="card-title">{{holding.name}}</h4>
            <p class="card-text">{{truncateString(holding.ad_description)}}</p>
            <div class="row">
              <div class="col">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item d-flex justify-content-between align-items-center"><i class="bi-rulers"></i>{{ holding.built_size }}mts2</li>
                  <li class="list-group-item d-flex justify-content-between align-items-center"><i class="bi bi-hourglass-bottom"></i>{{ holding.antique }} {{ holding.antique_value }}</li>
                </ul>
              </div>
              <div class="col mb-2">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item d-flex justify-content-between align-items-center"><i class="bi bi-grid-1x2"></i>{{ holding.floors }}</li>
                  <li class="list-group-item d-flex justify-content-between align-items-center"><i class="bi bi-cash-stack"></i>${{ holding.price }} {{ holding.currency_type }}</li>
                </ul>
              </div>
            </div>
            <div class="d-grid gap-2 d-md-block">
              <button class="btn btn-outline-primary me-2" @click="viewProperty(holding.id)">Ver Propiedad</button>
              <button class="btn btn-outline-danger" @click="deleteProperty(holding.id)">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/swiper-bundle.css'

  export default {
    components: {
      Swiper,
      SwiperSlide
    },
    data(){
      return {
        loading: true,
        swiperOption: {
          autoHeight: true,
          pagination: {
            el: '.swiper-pagination'
          },
          grabCursor: true,
          effect: 'fade',
          autoplay: {
            delay: 1000,
            disableOnInteraction: false
          },
        }
      }
    },
    mounted() {
      if (this.$store.getters.allHoldings.length === 0) {
        this.$store.dispatch('getHoldings')
      }
    },
    computed: {
      holdings() {
        return this.$store.getters.allHoldings
      },
    },
    methods: {
      viewProperty(id) {
        this.$router.push({ path: `/propiedad/${id}` })
      },
      deleteProperty(id) {
        this.$store.dispatch('deleteHolding', id);
      },
      truncateString(description, maxLength=50) {
        return description.slice(0, maxLength - 3) + '...'
      }
    }
  }
</script>
