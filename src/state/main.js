import { createPinia } from "pinia";
import { useRumahStore } from "./pinia/rumah";

const pinia = createPinia();
export default pinia;

export{
  useRumahStore
}