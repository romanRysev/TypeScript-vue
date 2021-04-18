<template>
  <section class="main">
    <h1 class="main__title">Комплекты стеллажных систем</h1>
    <label
      >Сортировать по:
      <select v-model="sortBy">
        <option value="asc">Возрастанию цены</option>
        <option value="desc">Убыванию цены</option>
      </select></label
    >
    <label
      >Материал
      <select v-model="selectedMaterial">
        <option :value="-1">Не важно</option>
        <option
          v-for="(material, id) in materials"
          placeholder="материал"
          :value="material.id"
          :key="id"
        >
          {{ material.name }}
        </option>
      </select></label
    >
    <div class="main__content-container">
      <ProductCard v-for="(card, i) in cardsList" :key="i" :card="card" />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import ProductCard from "../components/ProductCard.vue";
import materials from "../data/materials.json";
import cards from "../data/items.json";

interface MainData {
  cards: Record<string, unknown>[];
  materials: Record<string, unknown>[];
  selectedMaterial: number;
  sortBy: string;
}

export default Vue.extend({
  name: "Main",
  components: {
    ProductCard,
  },
  data(): MainData {
    return {
      cards: cards,
      materials: materials,
      selectedMaterial: -1,
      sortBy: "asc",
    };
  },
  computed: {
    cardsList(): Record<string, any>[] {
      let list: Record<string, any>[] = [];
      console.log("qwe");

      if (this.selectedMaterial !== -1) {
        list = this.cards.filter((item) => {
          if (item.material == this.selectedMaterial) return item;
        });
      } else {
        list = this.cards;
      }

      list.sort((a, b) => {
        if (this.sortBy === "asc") {
          return a.price.current_price - b.price.current_price;
        } else {
          return b.price.current_price - a.price.current_price;
        }
      });

      return list;
    },
  },
});
</script>

<style scoped>
.main__content-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.main__title {
  font-family: "SF Pro Display", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 48px;
  font-feature-settings: "ss04" on;
}
</style>
