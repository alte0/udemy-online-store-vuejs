import * as fb from 'firebase/app'
import 'firebase/database'

class Product {
  constructor (title, vendor, color, material, price, description, ownerId, imageSrc = '', promo = false, id = null) {
    this.title = title
    this.vendor = vendor
    this.color = color
    this.material = material
    this.price = price
    this.description = description
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    products: []
  },
  mutations: {
    createAddProduct (state, payload) {
      state.products.push(payload)
    },
    loadProducts (state, payload) {
      state.products = payload
    }
  },
  actions: {
    async createProduct ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const newProduct = new Product(
          payload.title,
          payload.vendor,
          payload.color,
          payload.material,
          payload.price,
          payload.description,
          getters.user.id,
          payload.imageSrc,
          payload.promo
          )

        const product = await fb.database().ref('products').push(newProduct)
        // console.log(product)
        commit('setLoading', false)
        commit('createAddProduct', {
          ...newProduct,
          id: product.key
        })
      } catch (error) {
        commit('setError', error.massage)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchProducts ({commit}) {
      commit('clearError')
      commit('setLoading', true)
      const resultProducts = []
      try {
        const productsVal = await fb.database().ref('products').once('value')
        const products = productsVal.val()
        Object.keys(products).forEach(key => {
          const product = products[key]
          resultProducts.push(
            new Product(
              product.title,
              product.vendor,
              product.color,
              product.material,
              product.price,
              product.description,
              product.ownerId,
              product.imageSrc,
              product.promo,
              key
            )
          )
          commit('loadProducts', resultProducts)
          commit('setLoading', false)
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
      }
    }
  },
  getters: {
    products (state) {
      return state.products
    },
    promoProducts (state) {
      return state.products.filter(products => {
        return products.promo
      })
    },
    myProducts (state) {
      return state.products
    },
    productById (state) {
      return productId => {
        return state.products.find(product => product.id === productId)
      }
    }
  }
}
