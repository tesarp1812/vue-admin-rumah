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
    totalpenghuni: 0,
    warga: []
  }),
  actions: {
    async fetchData() {
      this.isLoading = true;
      this.error = null;
      try {
        const [penghuniResponse, wargaResponse] = await Promise.all([
          axios.get('/penghuni'), // Mengambil data dari API /penghuni
          axios.get('/warga') // Mengambil data dari API /warga
        ]);

        this.penghuni = Array.isArray(penghuniResponse.data) ? penghuniResponse.data : [penghuniResponse.data];
        this.warga = Array.isArray(wargaResponse.data) ? wargaResponse.data : [wargaResponse.data];

        //  mencocokkan warga dengan penghuni
        this.penghuni = this.penghuni.map(p => ({
          ...p,
          warga: this.warga.find(w => w.id === p.warga_id) // Menggabungkan data warga ke dalam penghuni
        }));

        // console.log(this.penghuni);
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
        await this.fetchData();
      } catch (error) {
        this.error = 'Failed to add new Penghuni';
      } finally {
        this.isLoading = false;
      }
    },
    async fetchWarga() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('/warga');
        this.warga = Array.isArray(response.data) ? response.data : [response.data];
        // console.log("warga =",this.warga);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    async addWarga(newWarga) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.post('/warga', newWarga);
        alert(response.data.message || 'Warga berhasil ditambahkan');
        await this.fetchData();
      } catch (error) {
        this.error = 'Failed to add new Warga: ' + error.message;
        alert(this.error);
        window.location.reload();
      } finally {
        this.isLoading = false;
      }
    }
  },
});
