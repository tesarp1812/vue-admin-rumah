// src/state/pinia/rumah.js
import { defineStore } from 'pinia';
import axios from '../../axios'; // Sesuaikan dengan jalur axios Anda

export const useRumahStore = defineStore('rumah', {
  state: () => ({
    items: [],
    isLoading: false,    // Status loading
    error: null,         // Pesan error
    page: 1,             // Halaman saat ini
    perPage: 10,         // Jumlah item per halaman
    totalItems: 0        // Total item di server
  }),
  actions: {
    async fetchData() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('/rumah'); // Menggunakan URL relatif
        this.items = Array.isArray(response.data) ? response.data : [response.data];
        console.log(this.items)
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    async loadMore() {
      if (this.isLoading || this.items.length >= this.totalItems) return;
      await this.fetchData(this.page + 1);
    },
    async addRumah(newRumah) {
      this.isLoading = true;
      this.error = null;
      try {
        await axios.post('/rumah', newRumah);
        // Refresh the data after adding new rumah
        await this.fetchData();
      } catch (error) {
        this.error = 'Failed to add new rumah';
      } finally {
        this.isLoading = false;
      }
    }
  },
});
