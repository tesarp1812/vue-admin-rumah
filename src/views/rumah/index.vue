<template>
  <div class="rumah-page" @scroll="handleScroll">
    <AppNavbar />
    <div class="content">
      <h1 class="title">Data Rumah</h1>
      <button @click="loadData" class="load-button">Load Data</button>
      <button @click="showModal = true" class="add-button">Tambah Rumah</button>
      <p v-if="store.isLoading" class="status-message">Loading...</p>
      <p v-if="store.error" class="status-message error">Error: {{ store.error }}</p>
      <table v-if="!store.isLoading && !store.error" class="data-table">
        <thead>
          <tr>
            <th @click="sortBy('no_rumah')">Nomer Rumah</th>
            <th>Status Rumah</th>
            <th>Nama Penghuni</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sortedItems" :key="item.id">
            <td>{{ item.no_rumah }}</td>
            <td>
              <span v-if="item.penghuni.length > 0">
                {{ item.penghuni[0].Status_Penghuni }}
              </span>
            </td>
            <td>
              <span v-for="penghuni in item.penghuni" :key="penghuni.id">
                {{ penghuni.warga?.nama || 'Unknown' }}
                <span v-if="penghuni !== item.penghuni[item.penghuni.length - 1]">, </span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!store.isLoading && !store.error && store.items.length > 0" class="load-more">
        <button @click="loadMore" class="load-button">Load More</button>
      </div>
    </div>

    <!-- Modal Component Usage -->
    <formModal :isVisible="showModal" @close="showModal = false" />
  </div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue';
import formModal from './formModal.vue';
import { ref, computed, onMounted, onUnmounted } from 'vue'; 
import { useRumahStore } from '@/state/main';

export default {
  name: 'RumahPage',
  components: {
    AppNavbar,
    formModal // Register modal component
  },
  setup() {
    const store = useRumahStore();
    const showModal = ref(false); 

    const loadData = async () => {
      await store.fetchData(); 
    };

    const loadMore = async () => {
      await store.loadMore();
    };

    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight;
      const scrolled = window.innerHeight + window.scrollY;
      if (scrolled >= scrollable - 100) { // 100 px from the bottom of the page
        loadMore();
      }
    };

    const formatDate = (dateString) => {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const sortKey = ref('no_rumah');
    const sortOrder = ref('asc');

    const sortBy = (key) => {
      if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
      } else {
        sortKey.value = key;
        sortOrder.value = 'asc';
      }
    };

    const sortedItems = computed(() => {
      return [...store.mergedData].sort((a, b) => {
        let modifier = sortOrder.value === 'asc' ? 1 : -1;
        if (a[sortKey.value] < b[sortKey.value]) return -1 * modifier;
        if (a[sortKey.value] > b[sortKey.value]) return 1 * modifier;
        return 0;
      });
    });

    onMounted(() => {
      loadData();
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      store,
      loadData,
      loadMore,
      formatDate,
      sortBy,
      sortedItems,
      showModal // Expose showModal for modal visibility
    };
  }
};
</script>

<style scoped>
.rumah-page {
  padding: 20px;
  background-color: #f4f7f6;
  min-height: 100vh;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
}

.load-button {
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;
}

.load-button:hover {
  background-color: #0056b3;
}

.add-button {
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #0056b3;
}

.status-message {
  font-size: 1.1em;
  margin: 10px 0;
}

.status-message.error {
  color: #dc3545;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.data-table th,
.data-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.data-table th {
  background-color: #007bff;
  color: #ffffff;
  cursor: pointer;
}

.data-table th:hover {
  background-color: #0056b3;
}

.data-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.data-table tr:hover {
  background-color: #f1f1f1;
}

.data-table td {
  color: #333;
}

.load-more {
  text-align: center;
  margin-top: 20px;
}
</style>
