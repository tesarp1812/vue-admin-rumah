<template>
    <div>
        <AppNavbar />
        <div class="payment-list">
            <button @click="showFormPembayaran = true" class="load-button">Bayar Iuran</button>
            <h1>Payment List</h1>
            <div v-for="pembayaran in pembayaranStore.pembayaran" :key="pembayaran.id" class="payment-item">
                <h2>Payment ID: {{ pembayaran.id }}</h2>
                <p class="house-number">No Rumah: {{ pembayaran.penghuni?.rumah?.no_rumah || 'Tidak tersedia' }}</p>
                <p class="resident-name">Nama Warga: {{ pembayaran.penghuni?.warga?.nama || 'Tidak tersedia' }}</p>
                <p class="payment-date">Tanggal Pembayaran: {{ formatDate(pembayaran.Tanggal_Pembayaran) }}</p>
                <h3>Details:</h3>
                <ul class="details-list">
                    <li v-for="detail in pembayaran.details" :key="detail.id" class="detail-item">
                        Pembayaran: {{ detail.iuran?.nama_iuran || 'Tidak tersedia' }} = Rp {{
                            formatCurrency(detail.iuran?.harga || 0) }} / {{ detail.bulan }}-{{ detail.tahun }}
                    </li>
                    <li class="total">
                        <strong>Total: Rp {{ formatCurrency(calculateTotal(pembayaran.details)) }}</strong>
                    </li>
                </ul>
            </div>
        </div>

        <FormPembayaran :isVisible="showFormPembayaran" @close="showFormPembayaran = false" />
    </div>
</template>


<script>
import { onMounted, ref } from 'vue';
import { usePembayaranStore } from '@/state/main';
import AppNavbar from '@/components/AppNavbar.vue';
import FormPembayaran from './formPembayaran.vue';

export default {
    name: 'PembayaranPage',
    components: {
        AppNavbar,
        FormPembayaran
    },
    setup() {
        const pembayaranStore = usePembayaranStore();
        const showFormPembayaran = ref(false);

        onMounted(async () => {
            await loadData();
            await loadIuran();
        });

        const loadData = async () => {
            await pembayaranStore.fetchDataRumah();
            await pembayaranStore.fetchPembayaran();
        }

        const loadIuran = async () => {
            await pembayaranStore.fetchIuran();
            console.log('Iuran data loaded successfully:', pembayaranStore.iuran);
        }

        const calculateTotal = (details) => {
            if (!Array.isArray(details)) {
                return 0; // Kembalikan 0 jika details bukan array
            }
            return details.reduce((total, detail) => {
                return total + (detail.iuran?.harga || 0); // Gunakan optional chaining
            }, 0);
        }

        const formatCurrency = (amount) => {
            if (amount == null) return '0';
            return new Intl.NumberFormat('id-ID', {
                style: 'decimal',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(amount);
        }

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        }

        return {
            pembayaranStore,
            calculateTotal,
            formatCurrency,
            formatDate,
            showFormPembayaran
        };
    }
}
</script>

<style>
.payment-list {
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
}

.payment-item {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
}

.payment-item:hover {
    transform: scale(1.02);
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

h1 {
    margin-bottom: 20px;
    color: #343a40;
}

h2 {
    margin: 10px 0;
    color: #495057;
}

.house-number,
.resident-name,
.payment-date {
    margin: 5px 0;
    font-size: 16px;
    color: #6c757d;
}

.details-list {
    list-style-type: none;
    padding-left: 0;
}

.detail-item {
    margin: 5px 0;
    padding: 8px;
    border-bottom: 1px solid #e9ecef;
    color: #495057;
}

.total {
    font-weight: bold;
    font-size: 18px;
    margin-top: 10px;
}
</style>