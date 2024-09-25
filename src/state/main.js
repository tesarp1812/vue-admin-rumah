import { createPinia } from "pinia";
import { useRumahStore } from "./pinia/rumah";
import { usePenghuniStore } from "./pinia/penghuni";
import { usePembayaranStore } from "./pinia/pembayaran";

const pinia = createPinia();
export default pinia;

export{
  useRumahStore,
  usePenghuniStore,
  usePembayaranStore
}