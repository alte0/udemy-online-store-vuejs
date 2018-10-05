export default {
  state: {
    orders: [
      {
        id: 'test',
        name: 'Vasya 1',
        phone: '+3452 23 23 23',
        productId: '1',
        done: false
      },
      {
        id: 'test2',
        name: 'Vasya 2',
        phone: '+7646345',
        productId: '2',
        done: false
      }
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    orders (state) {
      return state.orders
    }
  }
}
