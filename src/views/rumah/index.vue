<template>
  <div>
    <h1>Data Rumah</h1>
    <button @click="loadData">Load Data</button>
    <p v-if="store.isLoading">Loading...</p>
    <p v-if="store.error">Error: {{ store.error }}</p>
    <table v-if="!store.isLoading && !store.error" border="1">
      <thead>
        <tr>
          <th @click="sortBy('no_rumah')">Nomer Rumah</th>
          <th>Status Rumah</th>
          <th>Penghuni</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sortedItems" :key="item.id">
          <td>{{ item.no_rumah }}</td>
          <td>{{ item.Status_Rumah }}</td>
          <td>{{ item.penghuni_id }}</td>
          <td>{{ formatDate(item.created_at) }}</td>
          <td>{{ formatDate(item.updated_at) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, computed } from 'vue'; // Import ref and computed
import { useRumahStore } from '../../state/pinia/rumah'; // Sesuaikan jalur jika perlu

export default {
  name: 'RumahPage',
  setup() {
    const store = useRumahStore();

    // State untuk pengurutan
    const sortKey = ref('no_rumah'); // Kolom default yang diurutkan
    const sortOrder = ref('asc'); // Urutan default: ascending

    const loadData = () => {
      store.fetchData();
    };

    const formatDate = (dateString) => {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric'};
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const sortBy = (key) => {
      if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
      } else {
        sortKey.value = key;
        sortOrder.value = 'asc';
      }
    };

    // Computed property untuk mengurutkan data
    const sortedItems = computed(() => {
      return [...store.items].sort((a, b) => {
        let modifier = sortOrder.value === 'asc' ? 1 : -1;
        if (a[sortKey.value] < b[sortKey.value]) return -1 * modifier;
        if (a[sortKey.value] > b[sortKey.value]) return 1 * modifier;
        return 0;
      });
    });

    return {
      store,
      loadData,
      formatDate,
      sortBy,
      sortedItems,
    };
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
  cursor: pointer; /* Add cursor pointer to indicate clickable headers */
}
tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
