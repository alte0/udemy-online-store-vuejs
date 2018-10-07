<template>
  <v-container>
    <section class="product mt-3 evation-10" v-if="!loading">
      <v-layout row wrap>
        <v-flex xs12 lg6>
          <img class="product_img" :src=product.imageSrc>
        </v-flex>
        <v-flex sx12 lg6>
          <div class="product_info">
            <h5 class="product_title display-1 mb-3 mt-3">{{ product.title }}</h5>
            <p class="product_category title">
              <span class="product_title">Vendor: </span>{{ product.vendor.charAt(0).toUpperCase() + product.vendor.substring(1) }}
            </p>
            <p class="product_price title">
              <span class="product_title">Price: </span>${{ product.price }}
            </p>
            <p class="product_color">
              <span class="product_title">Color: </span>
              <span
                :title="product.color"
                :style="{backgroundColor: product.color}"
                class="product_color__bg"
                ></span>
            </p>
            <p class="title">
              <span class="product_title">Material: </span>{{ product.material.charAt(0).toUpperCase() + product.material.substring(1) }}
            </p>
            <div class="title mb-5">
              <p class="product_title mb-2">{{ product.description }}
              </p>
              <app-edit-product
                :product="product"
                v-if="isOwner"></app-edit-product>
              <v-btn color="primary" class="heading">Buy</v-btn>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </section>
    <section v-else class="text-xs-center">
      <v-container>
        <v-layout>
          <v-flex xs12 class="text-xs-center pt-5">
            <v-progress-circular
              :size="100"
              :width="4"
              indeterminate
              color="purple"
              ></v-progress-circular>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
  </v-container>
</template>

<script>
import EditProduct from './EditProduct'

export default {
  props: ['id'],
  computed: {
    product () {
      const id = this.id
      return this.$store.getters.productById(id)
    },
    loading () {
      return this.$store.getters.loading
    },
    isOwner () {
      return this.product.ownerId === this.$store.getters.user.id
    }
  },
  components: {
    appEditProduct: EditProduct
  }
}
</script>

<style scoped>
  .product {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border: 1px solid #1c77ad;
    padding: 30px;
    margin-bottom: 100px;
  }
  .product_img {
    height: 100%;
    width: 550px;
  }
  .product_info {
    margin-left: 50px;
  }
  .product_title {
    font-size: 1.6rem;
    font-weight: bold;
    color: #1875d0;
    margin-bottom: 0;
  }
  .product_price {
    color: red;
  }
  .product_color__bg {
    display: inline-block;
    width: 50px;
    height: 20px;
    border: 1px solid #2b2b2b;
    border-radius: 10px;
  }
  @media screen and (max-width: 1270px) {
    .product {
      text-align: center;
    }
    .product_info {
      margin-left: 0;
    }
  }
  @media screen and (max-width: 620px) {
    .product {
      text-align: start;
    }
    .product_img {
      width: 100%;
      height: 100%;
    }
    .product_title {
      text-align: center;
    }
  }
  @media screen and (max-width: 400px) {
    .product {
      padding: 10px;
      text-align: start;
      margin-bottom: 120px
    }
    .product_img {
      height: 250px;
      width: 100%;
    }
    .product_info {
      margin-left: 0;
    }
  }
</style>
