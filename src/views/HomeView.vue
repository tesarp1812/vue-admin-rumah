<template>
  <AppNavbar />
  <div class="home-view">
    <h1 class="title">Dashboard</h1>
    <p class="message">{{ store.message }}</p>
    <ul class="item-list">
      <li v-for="item in store.items" :key="item" class="item">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue';
import { useRumahStore } from '../state/pinia/rumah'; 

export default {
  name: 'HomeView',
  components: {
    AppNavbar
  },
  setup() {
    const store = useRumahStore();

    const addNewItem = () => {
      store.addItem(`Item ${store.items.length + 1}`);
    };

    return {
      store,
      addNewItem
    };
  }
};
</script>

<style scoped>
.home-view {
  padding: 20px;
  background-color: #f8f9fa;
}

.title {
  font-size: 2em;
  margin-bottom: 20px;
}

.message {
  font-size: 1.2em;
  margin-bottom: 20px;
  color: #333;
}

.item-list {
  list-style: none;
  padding: 0;
}

.item {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}

.add-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}

.add-button:hover {
  background-color: #0056b3;
}
</style>
