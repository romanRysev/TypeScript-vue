<template>
  <div class="main">
    <header class="header">
      <p>Главная / Системы хранения / Комплекты стеллажных систем</p>
      <h1 class="main__title">Комплекты стеллажных систем</h1>
      <div class="selects">
        <label class="select-label"
          >Сортировать по:
          <select class="select" v-model="sortBy">
            <option value="">Не важно</option>
            <option value="asc">Возрастанию цены</option>
            <option value="desc">Убыванию цены</option>
          </select></label
        >
        <label class="select-label"
          >Материал
          <select class="select" v-model="selectedMaterial">
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
      </div>
    </header>
    <main class="main__content-container">
      <ProductCard v-for="(card, i) in cardsList" :key="i" :card="card" />
    </main>
  </div>
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
      sortBy: "",
    };
  },
  computed: {
    cardsList(): Record<string, any>[] {
      let list: Record<string, any>[] = [];

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
.main {
  font-family: "SF Pro Display", sans-serif;
  max-width: 1536px;
  margin: auto;
}
.header {
  padding-left: 50px;
}
.main__content-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.main__title {
  font-weight: 600;
  font-size: 36px;
  line-height: 48px;
}
.selects {
  display: flex;
}
.select {
  height: 40px;
  background-color: #f2f2f2;
  border: none;
  font-size: 14px;
  letter-spacing: 0.03em;
  padding-left: 16px;
  padding-right: 19px;
  margin-right: 24px;
  line-height: 150%;
}
.select-label {
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.03em;
  color: #4f4f4f;
  display: flex;
  flex-direction: column;
  max-width: min-content;
}
</style>
