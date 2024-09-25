<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <h1>Form Pembayaran</h1>
            <form @submit.prevent="submitForm">
                <div class="penghuni-section">
                    <label for="penghuni_id">Pilih Penghuni:</label>
                    <select v-model="form.penghuni_id" id="penghuni_id" required>
                        <option value="" disabled>Select Penghuni</option>
                        <option v-for="penghuni in sortedPenghuniList" :key="penghuni.id" :value="penghuni.id">
                            {{ penghuni.warga?.nama || 'Tidak tersedia' }}, no rumah: {{ penghuni.rumah?.no_rumah || 'Tidak tersedia' }}
                        </option>
                    </select>
                </div>

                <h3>Detail Pembayaran</h3>
                <div class="details-container">
                    <div v-for="(detail, index) in form.detail" :key="index" class="detail-item">
                        <div class="detail-fields">
                            <div class="iuran-field">
                                <label :for="'iuran_id_' + index">Pilih Iuran:</label>
                                <select v-model="detail.iuran_id" :id="'iuran_id_' + index" required
                                    class="wide-select">
                                    <option value="" disabled>Select Iuran</option>
                                    <option v-for="iuran in iuranList" :key="iuran.id" :value="iuran.id">
                                        {{ iuran.nama_iuran }} - {{ iuran.harga }}
                                    </option>
                                </select>
                            </div>
                            <div class="month-year-fields">
                                <div>
                                    <label :for="'bulan_' + index">Bulan:</label>
                                    <input type="number" v-model="detail.bulan" :id="'bulan_' + index" min="1" max="12"
                                        required />
                                </div>
                                <div class="year-field">
                                    <label :for="'tahun_' + index">Tahun:</label>
                                    <input type="number" v-model="detail.tahun" :id="'tahun_' + index" required
                                        class="large-year-input" />
                                </div>
                            </div>
                            <button type="button" @click="removeDetail(index)" class="remove-button">Remove</button>
                        </div>
                    </div>
                </div>

                <button type="button" @click="addDetail" class="detail-button">Add Detail</button>

                <div class="total">
                    <h4>Total: {{ totalAmount }}</h4>
                </div>

                <div class="action-buttons">
                    <button type="submit">Bayar</button>
                    <button type="button" @click="closeModal">Cancel</button>
                    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { usePembayaranStore } from '@/state/main';

export default {
    name: 'FormPembayaran',
    props: {
        isVisible: {
            type: Boolean,
            required: true,
        },
    },
    emits: ['close'],
    setup(props, { emit }) {
        const store = usePembayaranStore();
        const form = ref({
            penghuni_id: '',
            detail: [
                {
                    iuran_id: '',
                    bulan: null,
                    tahun: null,
                },
            ],
        });
        const errorMessage = computed(() => store.errorMessage);
        const iuranList = ref([]);

        const fetchOptions = async () => {
            try {
                await store.fetchDataRumah();
                await store.fetchIuran();
                iuranList.value = store.iuran; // Get iuran list from store
            } catch (error) {
                errorMessage.value = 'Terjadi kesalahan saat memuat data';
            }
        };

        const submitForm = async () => {
            await store.addPembayaran(form.value);
            if (store.errorMessage) {
                return;
            }
            await store.fetchPembayaran(); // Memuat ulang data pembayaran
            emit('close'); // Close modal only if there's no error
            resetForm();
        };

        const resetForm = () => {
            form.value = {
                penghuni_id: '',
                detail: [
                    {
                        iuran_id: '',
                        bulan: null,
                        tahun: null,
                    },
                ],
            };
        };

        const addDetail = () => {
            form.value.detail.push({
                iuran_id: '',
                bulan: null,
                tahun: null,
            });
        };

        const removeDetail = (index) => {
            form.value.detail.splice(index, 1);
        };

        const closeModal = () => {
            emit('close');
        };

        const sortedPenghuniList = computed(() => {
            return (store.penghuni || []).sort((a, b) => {
                const noRumahA = a.rumah ? a.rumah.no_rumah : Infinity;
                const noRumahB = b.rumah ? b.rumah.no_rumah : Infinity;
                return noRumahA - noRumahB;
            });
        });

        const totalAmount = computed(() => {
            return form.value.detail.reduce((total, detail) => {
                const iuran = iuranList.value.find(i => i.id === detail.iuran_id);
                return total + (iuran ? iuran.harga : 0);
            }, 0);
        });

        onMounted(() => {
            fetchOptions();
        });

        return {
            form,
            submitForm,
            closeModal,
            errorMessage,
            addDetail,
            removeDetail,
            sortedPenghuniList,
            iuranList,
            totalAmount,
        };
    },
};
</script>


<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: #ffffff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    /* Increased width */
    width: 90%;
    max-height: 80vh;
    /* Limit modal height */
    overflow-y: auto;
    /* Enable scrolling */
}

.penghuni-section {
    margin-bottom: 20px;
}

.details-container {
    max-height: 300px;
    /* Limit height of details section */
    overflow-y: auto;
    /* Enable scrolling */
    margin-bottom: 20px;
    /* Space between details and total */
}

.detail-item {
    margin-bottom: 15px;
}

.detail-fields {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.iuran-field {
    flex: 2;
    margin-right: 40px;
    /* Space between Iuran and month/year fields */
}

.month-year-fields {
    display: flex;
    margin-right: 5px;
    /* Space between fields */
}

.month-year-fields div {
    margin-right: 5px;
    /* Space between month and year inputs */
}

.total {
    margin-top: 20px;
    /* Space above the total */
    font-weight: bold;
    /* Bold text for total */
    font-size: 1.2em;
    /* Larger font size for total */
}

.action-buttons {
    display: flex;
    justify-content: flex-start;
    /* Aligns buttons to the left */
    margin-top: 20px;
    /* Adds space above buttons */
}

.modal-content h1 {
    margin-top: 0;
    font-size: 1.5em;
    color: #333;
}

.modal-content label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
}

.modal-content input,
.modal-content select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1em;
    box-sizing: border-box;
}

.modal-content input:focus,
.modal-content select:focus {
    border-color: #007bff;
    outline: none;
}

.modal-content button {
    padding: 10px 15px;
    border: none;
    border-radius: 6px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.modal-content button[type="submit"] {
    background-color: #28a745;
    color: #fff;
}

.modal-content button[type="submit"]:hover {
    background-color: #218838;
}

.modal-content button[type="button"] {
    background-color: #dc3545;
    color: #fff;
    margin-left: 10px;
    /* Space between Cancel and Remove buttons */
}

.modal-content button[type="button"]:hover {
    background-color: #c82333;
}

.detail-button {
    background-color: #2b80ff;
    color: #fff;
    margin-top: 10px;
    /* Adds space above Add Detail button */
}

.error {
    margin-top: 10px;
    color: #dc3545;
    font-size: 0.875em;
}
</style>