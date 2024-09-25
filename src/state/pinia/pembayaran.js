import { defineStore } from "pinia";
import axios from '@/axios';

export const usePembayaranStore = defineStore('pembayaran', {
    state: () => ({
        pembayaran: [],
        isLoading: false,
        error: null,
        page: 1,
        perPage: 5,
        totalPembayaran: 0,
        penghuni: [],
        rumah: [],
        warga: [],
        iuran: [],
        errorMessage: '',
    }),
    actions: {
        async fetchDataRumah() {
            this.isLoading = true;
            this.error = null;
            try {
                const [penghuniResponse, rumahResponse, wargaResponse] = await Promise.all([
                    axios.get('/penghuni'),
                    axios.get('/rumah'),
                    axios.get('/warga')
                ]);
                this.penghuni = Array.isArray(penghuniResponse.data) ? penghuniResponse.data : [penghuniResponse.data];
                this.rumah = Array.isArray(rumahResponse.data) ? rumahResponse.data : [rumahResponse.data];
                this.warga = Array.isArray(wargaResponse.data) ? wargaResponse.data : [wargaResponse.data];

                this.penghuni = this.penghuni.map(p => ({
                    ...p,
                    warga: this.warga.find(w => w.id === p.warga_id) || {},
                    rumah: this.rumah.find(r => r.id === p.rumah_id) || {}
                }));
                // console.log("data", this.penghuni);
            } catch (error) {
                this.error = error.message;
            } finally {
                this.isLoading = false
            }
        },
        async fetchPembayaran() {
            this.isLoading = true;
            this.error = null;
            try {
                const [pembayaranResponse, iuranResponse] = await Promise.all([
                    axios.get('/pembayaran'),
                    axios.get('/iuran')  // Fetch iuran data
                ]);
                this.pembayaran = Array.isArray(pembayaranResponse.data) ? pembayaranResponse.data : [pembayaranResponse.data];
                this.iuran = Array.isArray(iuranResponse.data) ? iuranResponse.data : [iuranResponse.data];

                this.pembayaran = this.pembayaran.map(p => {
                    const matchedPenghuni = this.penghuni.find(i => i.id === p.penghuni_id);

                    // Match details with iuran data
                    const detailsWithIuran = p.details.map(detail => {
                        const matchedIuran = this.iuran.find(i => i.id === detail.iuran_id);
                        return {
                            ...detail,
                            iuran: matchedIuran // Add matched iuran to detail
                        };
                    });
                    return {
                        ...p,
                        penghuni: matchedPenghuni,
                        details: detailsWithIuran
                    };
                });
                // console.log("pembayaran", this.pembayaran);
            } catch (error) {
                this.error = error.message;
            } finally {
                this.isLoading = false;
            }
        },
        async fetchIuran() {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await axios.get('/iuran');
                this.iuran = Array.isArray(response.data) ? response.data : [response.data];
                // console.log('test',this.iuran);
            } catch (error) {
                this.error = error.message;
            } finally {
                this.isLoading = false;
            }
        },
        async addPembayaran(pembayaranData) {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await axios.post('/pembayaran', pembayaranData);
                this.pembayaran.push(response.data);
                await this.fetchPembayaran(); // Memuat ulang pembayaran setelah penambahan
                this.errorMessage = ''; // Clear previous errors
            } catch (error) {
                if (error.response && error.response.data.Massage) {
                    const messages = error.response.data.Massage.join('\n');
                    this.errorMessage = messages;
                    alert(messages);
                } else {
                    this.errorMessage = error.message;
                    alert(this.errorMessage);
                }
            } finally {
                this.isLoading = false;
            }
        },
    }
});