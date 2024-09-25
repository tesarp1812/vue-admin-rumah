<template>
    <AppNavbar />
    <div class="content">
        <h1 class="title">Data Warga</h1>
        <button @click="showFormRumah = true" class="load-button">Tambah Data Warga</button>
        
        <!-- Loading and Error Messages -->
        <div v-if="store.isLoading" class="status-message">Loading...</div>
        <div v-if="store.error" class="status-message error">{{ store.error }}</div>

        <!-- Data Table -->
        <table v-if="!store.isLoading && !store.error && penghuni.length" class="data-table">
            <thead>
                <tr>
                    <th>Nama Lengkap</th>
                    <th>Status Penghuni</th>
                    <th>Nomor Telepon</th>
                    <th>Status Menikah</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="penghuniItem in penghuni" :key="penghuniItem.id">
                    <td>{{ penghuniItem.warga?.nama }}</td>
                    <td>{{ penghuniItem.Status_Penghuni }}</td>
                    <td>{{ penghuniItem.warga?.Nomor_Telepon }}</td>
                    <td>{{ penghuniItem.warga?.Status_Menikah }}</td>
                </tr>
            </tbody>
        </table>

        <!-- Pagination Controls -->
        <div v-if="!store.isLoading && penghuni.length" class="pagination">
            <button @click="changePage(store.page - 1)" :disabled="store.page <= 1">Previous</button>
            <span>Page {{ store.page }} of {{ totalPages }}</span>
            <button @click="changePage(store.page + 1)" :disabled="store.page >= totalPages">Next</button>
        </div>

        <!-- Form Component -->
        <formRumah :isVisible="showFormRumah" @close="showFormRumah = false" />
    </div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue';
import formRumah from './formRumah.vue';
import { usePenghuniStore } from '@/state/pinia/penghuni'; // Adjust path to your store
import { computed, onMounted, ref } from 'vue';

export default {
    name: 'PenghuniPage',
    components: {
        AppNavbar,
        formRumah
    },
    setup() {
        const store = usePenghuniStore();
        const penghuni = computed(() => store.penghuni);
        const totalPages = computed(() => Math.ceil(store.totalpenghuni / store.perPage));
        const showFormRumah = ref(false);

        // Fetch initial data when component is mounted
        onMounted(() => {
            loadData();
            loadWarga();
        });

        // Load penghuni data
        const loadData = async () => {
            await store.fetchData(1);
        };

        // Load warga data
        const loadWarga = async () => {
            await store.fetchWarga();
        };

        // Change the current page
        const changePage = async (newPage) => {
            if (newPage < 1 || newPage > totalPages.value) return;
            await store.changePage(newPage);
        };

        return {
            store,
            penghuni,
            totalPages,
            changePage,
            showFormRumah
        };
    }
}
</script>

<style scoped>
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

.pagination {
    text-align: center;
    margin-top: 20px;
}

.pagination button {
    background-color: #007bff;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s;
    margin: 0 5px;
}

.pagination button:hover {
    background-color: #0056b3;
}

.pagination button:disabled {
    background-color: #c0c0c0;
    cursor: not-allowed;
}
</style>
