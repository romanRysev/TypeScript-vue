<template>
  <div class="main">
    <header class="header">
      <div class="breadcrumbs">
        <a
          class="breadcrumbs__item"
          v-for="(crumb, id) in breadcrumbs"
          :href="crumb.url"
          :key="id"
          >{{ crumb.text }}</a
        >
      </div>
      <h1 class="main__title">Комплекты стеллажных систем</h1>
      <div class="selects">
        <label class="select-label"
          ><span class="select-label__text">Сортировать по:</span>
          <select class="select" v-model="sortBy">
            <option value="">Не важно</option>
            <option value="asc">Возрастанию цены</option>
            <option value="desc">Убыванию цены</option>
          </select>
        </label>
        <label class="select-label"
          ><span class="select-label__text">Материал</span>
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
          </select>
        </label>
      </div>
    </header>
    <main class="main__content-container">
      <ProductCard
        v-for="(card, i) in cardsList"
        :key="i"
        :card="card"
        :inShopping="card.inShopping"
        :liked="card.liked"
      />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ProductCard from "../components/ProductCard.vue";
import materials from "../data/materials.json";

interface MainData {
  cards: Record<string, unknown>[];
  materials: Record<string, unknown>[];
  selectedMaterial: number;
  sortBy: string;
  breadcrumbs: Record<string, unknown>[];
}

export default Vue.extend({
  name: "Main",
  components: {
    ProductCard,
  },
  created() {
    this.$store.dispatch("fetchCards");
    this.$store.dispatch("fetchLocal");
    this.cards = this.$store.getters.getCards;
  },
  data(): MainData {
    return {
      cards: [],
      materials: materials,
      selectedMaterial: -1,
      sortBy: "",
      breadcrumbs: [
        { url: "#", text: "Главная" },
        { url: "#", text: "Системы хранения" },
        { url: "#", text: "Комплекты стеллажных систем" },
      ],
    };
  },
  computed: {
    cardsList(): any[] {
      let list: any[] = [];
      if (this.selectedMaterial !== -1) {
        list = this.cards.filter((item) => {
          if (item.material == this.selectedMaterial) return item;
        });
      } else {
        list = this.cards.slice();
      }

      list.sort((a, b) => {
        if (this.sortBy === "asc") {
          return a.price.current_price - b.price.current_price;
        } else {
          return b.price.current_price - a.price.current_price;
        }
      });

      list.forEach((item) => {
        if (
          this.$store.getters.getCart.find(
            (elem: { id: number | string }) => item.id == elem.id
          )
        ) {
          item.inShopping = true;
        } else {
          item.inShopping = false;
        }

        if (
          this.$store.getters.getLiked.find(
            (elem: { id: number | string }) => item.id == elem.id
          )
        ) {
          item.liked = true;
        } else {
          item.liked = false;
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
  padding-left: 24px;
  box-sizing: border-box;
}
.breadcrumbs {
  margin-top: 32px;
  font-family: "SF UI Text", sans-serif;
  font-size: 16px;
  line-height: 16px;
}
.breadcrumbs__item {
  color: black;
  text-decoration: none;
}
.breadcrumbs__item:not(:last-child) {
  color: #828282;
}
.breadcrumbs__item:not(:last-child)::after {
  content: " / ";
  width: 30px;
  display: inline-block;
  text-align: center;
  cursor: auto;
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
  flex-wrap: wrap;
  margin-bottom: 21px;
}
.select {
  height: 40px;
  background-color: #f2f2f2;
  border: none;
  font-size: 14px;
  letter-spacing: 0.03em;
  padding-left: 16px;
  padding-right: 19px;
  line-height: 150%;
  background-image: url("../../public/pic/arrow.svg");
  background-repeat: no-repeat;
  background-position: 252px center;
  appearance: none;
}
.select:focus {
  outline: none;
}
.select-label {
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.03em;
  color: #4f4f4f;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 288px;
  margin-right: 24px;
  font-family: "SF Pro Display", sans-serif;
}
.select-label__text {
  margin-bottom: 6px;
  padding-left: 19px;
}

@media screen and (max-width: 1570px) {
  .header {
    max-width: 1152px;
    margin: auto;
  }
}

@media screen and (max-width: 1184px) {
  .header {
    max-width: 768px;
  }
}
</style>
