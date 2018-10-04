<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary">Create new product</h1>
          <v-form ref="form" v-model="valid" lazy-validation class="mb-3">
            <v-text-field
              name="title"
              label="Title"
              type="text"
              v-model="title"
              :rules="[v => !!v || 'Title is required' ]"
              required
              ></v-text-field>
            <v-text-field
              name="vendor"
              label="Vendor product"
              type="text"
              v-model="vendor"
              ></v-text-field>
            <v-text-field
              name="color"
              label="Vendor product"
              type="text"
              v-model="color"
              ></v-text-field>
            <v-text-field
              name="material"
              label="Material product"
              type="text"
              v-model="material"
              ></v-text-field>
            <v-text-field
              name="price"
              label="Price product"
              type="text"
              v-model="price"
              :rules="[v => !!v || 'Price is required' ]"
              required
              ></v-text-field>
            <v-text-field
              name="description"
              label="Description product"
              type="text"
              multi-line
              v-model="description"
              ></v-text-field>
          </v-form>
          <v-layout class="mb-3">
            <v-flex xs12>
              <v-btn class="warning">
                Upload
                <v-icon right dark>cloud_upload</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout>
            <img src="" height="200">
          </v-layout>
          <v-layout>
            <v-switch
              color="primary"
              :label="`Add to promo`"
              v-model="promo"
            ></v-switch>
          </v-layout>
          <v-layout>
            <v-spacer></v-spacer>
            <v-btn
              class="success"
              @click="createProduct"
              :disabled="!valid"
              >
              Create product
            </v-btn>
          </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      title: '',
      vendor: '',
      color: '',
      material: '',
      price: 0,
      description: '',
      promo: false
    }
  },
  methods: {
    createProduct () {
      if (this.$refs.form.validate()) {
        const product = {
          title: this.title,
          vendor: this.vendor,
          color: this.color,
          material: this.material,
          price: this.price,
          description: this.description,
          promo: this.promo
        }
        console.log(product)
      }
    }
  }
}
</script>
