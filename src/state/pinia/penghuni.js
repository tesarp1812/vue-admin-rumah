// src/state/pinia/penghuni.js
import { defineStore } from 'pinia';
import axios from '../../axios'; // Sesuaikan dengan jalur axios Anda

export const usePenghuniStore = defineStore('penghuni', {
  state: () => ({
    penghuni: [],
    isLoading: false,    
    error: null,         
    page: 1,             
    perPage: 5,        
    totalpenghuni: 0        
  }),
  actions: {
    async fetchData() {
      this.isLoading = true;
      
      this.error = null;
      try {
        const response = await axios.get('/penghuni'); // Menggunakan URL relatif
        this.penghuni = Array.isArray(response.data) ? response.data : [response.data];
        console.log(this.penghuni);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    async loadMore() {
      if (this.isLoading || this.penghuni.length >= this.totalpenghuni) return;
      await this.fetchData(this.page + 1);
    },
    async addPenghuni(newPenghuni) {
      this.isLoading = true;
      this.error = null;
      try {
        await axios.post('/penghuni', newPenghuni);
        // Refresh the data after adding new Penghuni
        await this.fetchData();
      } catch (error) {
        this.error = 'Failed to add new Penghuni';
      } finally {
        this.isLoading = false;
      }
    }
  },
});
