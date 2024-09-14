import { createPinia } from "pinia";
import { useRumahStore } from "./pinia/rumah";
import { usePenghuniStore } from "./pinia/penghuni";

const pinia = createPinia();
export default pinia;

export{
  useRumahStore,
  usePenghuniStore
}