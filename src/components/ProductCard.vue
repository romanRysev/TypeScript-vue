<template>
  <div>
    <div class="card">
      <p class="card__label" v-if="card.price.old_price">Скидка</p>
      <img class="card__image" :src="`.${card.image.url}`" alt="фото товара" />
      <p class="card__code">{{ card.code }}</p>
      <p class="card__name">{{ card.name }}</p>
      <div class="card__footer">
        <div class="card__price">
          <p class="card__old-price" v-if="card.price.old_price">
            {{ card.price.old_price }}&#8381;
          </p>
          <p class="card__current-price">
            {{ card.price.current_price }}&#8381;
          </p>
        </div>
        <div class="card__icon-container">
          <img
            class="icon"
            v-if="inShopping"
            src="../../public/pic/shopping_active.svg"
            alt="shoppingAdded"
            @click="deleteFromCart"
          />
          <img
            class="icon"
            v-else
            src="../../public/pic/shopping.svg"
            alt="ToShopping"
            @click="toShopping"
          />
          <img
            class="icon"
            v-if="liked"
            src="../../public/pic/like_active.svg"
            alt="Liked"
            @click="dislike"
          />
          <img
            v-else
            class="icon"
            src="../../public/pic/like.svg"
            alt="Like"
            @click="toLiked"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ProductCard",
  props: {
    card: { type: Object },
    liked: { type: Boolean, default: false },
    inShopping: { type: Boolean, default: false },
  },
  methods: {
    toShopping() {
      this.$store.dispatch("addToLocalCart", this.card);
    },
    toLiked() {
      this.$store.dispatch("addToLiked", this.card);
    },
    dislike() {
      this.$store.dispatch("dislike", this.card);
    },
    deleteFromCart() {
      this.$store.dispatch("deleteFromCart", this.card);
    },
  },
});
</script>

<style scoped>
.card {
  font-family: "SF UI Text Medium", sans-serif;
  width: 336px;
  min-height: 352px;
  border: solid 1px #eee;
  padding: 9px 22px 9px 12px;
  position: relative;
  box-sizing: border-box;
  margin: 20px 24px 20px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card__label {
  position: absolute;
  top: 0;
  left: 0;
  background: #eb5757;
  padding: 3px 16px;
  color: #fff;
  font-family: "SF Pro Display", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0.01em;
  font-feature-settings: "ss04" on;
}
.card__image {
  width: 238px;
  height: 237px;
  align-self: center;
}

.card__code {
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 140%;
  letter-spacing: 0.02em;
  color: #888888;
  margin: 23px 0 6px;
}

.card__name {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0.02em;
  margin: 0 0 9px;
  word-break: break-all;
}

.card__footer {
  display: flex;
  justify-content: space-between;
}
.card__price {
  display: flex;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0.02em;
}
.card__old-price {
  text-decoration-line: line-through;
  color: #888888;
  margin: 0 9px 0 0;
}
.card__current-price {
  margin: 0;
}
.card__icon-container {
  width: 66px;
  display: flex;
  justify-content: space-between;
}
.icon {
  cursor: pointer;
}
</style>
