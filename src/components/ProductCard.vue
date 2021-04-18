<template>
  <div>
    <div class="card">
      <p class="card__label" v-if="card.price.old_price">Скидка</p>
      <img class="card__image" :src="card.image.url" alt="фото товара" />
      <p class="card__code">{{ card.code }}</p>
      <p class="card__name">{{ card.name }}</p>
      <div class="card__price">
        <p class="card__old-price" v-if="card.price.old_price">
          {{ card.price.old_price }}&#8381;
        </p>
        <p class="card__current-price">{{ card.price.current_price }}&#8381;</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ProductCard",
  props: { card: { type: Object } },
});
</script>

<style scoped>
.card {
  width: 336px;
  height: 352px;
  border: solid 1px #eee;
  padding: 9px 22px 9px 12px;
  position: relative;
  box-sizing: border-box;
  margin: 20px 24px 20px 24px;
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
}

.card__code {
  font-family: "SF UI Text", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 140%;
  letter-spacing: 0.02em;
  color: #888888;
}

.card__name {
  font-family: "SF UI Text", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0.02em;
}

.card__price {
  display: flex;
}
.card__old-price {
  font-family: "SF UI Text", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0.02em;
  text-decoration-line: line-through;
  color: #888888;
}
.card__current-price {
  font-family: "SF UI Text", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0.02em;
}
</style>
