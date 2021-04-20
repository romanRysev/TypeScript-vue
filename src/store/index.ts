import Vue from "vue";
import Vuex from "vuex";
import cards from "../data/items.json";

Vue.use(Vuex);

interface Istate {
  cards: any[];
  cart: any[];
  liked: any[];
}

export default new Vuex.Store({
  state: <Istate>{
    cards: [],
    cart: [],
    liked: [],
  },
  mutations: {
    setCart(state, value) {
      state.cart = value;
    },
    setLiked(state, value) {
      state.liked = value;
    },
    setCards(state, value) {
      state.cards = value;
    },
  },
  actions: {
    fetchCards(state) {
      state.commit("setCards", cards);
    },
    fetchLocal(state) {
      if (localStorage.getItem("cart") !== null) {
        const cart = JSON.parse(<string>localStorage.getItem("cart"));
        state.commit("setCart", cart);
      }
      if (localStorage.getItem("liked") !== null) {
        const liked = JSON.parse(<string>localStorage.getItem("liked"));
        state.commit("setLiked", liked);
      }
    },
    addToLocalCart(state, cart) {
      const inStore = state.state.cart;
      inStore.push(cart);
      localStorage.setItem("cart", JSON.stringify(inStore));
      state.commit("setCart", inStore);
    },
    addToLiked(state, card) {
      const inStore = state.state.liked;
      inStore.push(card);
      localStorage.setItem("liked", JSON.stringify(inStore));
      state.commit("setLiked", inStore);
    },
    dislike(state, card) {
      const inStore = state.state.liked;
      inStore.splice(
        state.state.liked.findIndex((item) => {
          return item.id == card.id;
        }),
        1
      );
      localStorage.setItem("liked", JSON.stringify(inStore));
      state.commit("setLiked", inStore);
    },
    deleteFromCart(state, card) {
      const inStore = state.state.cart;
      inStore.splice(
        state.state.cart.findIndex((item) => {
          return item.id == card.id;
        }),
        1
      );
      localStorage.setItem("cart", JSON.stringify(inStore));
      state.commit("setCart", inStore);
    },
  },
  getters: {
    getCart(state) {
      return state.cart;
    },
    getLiked(state) {
      return state.liked;
    },
    getCards(state) {
      return state.cards;
    },
  },
});
