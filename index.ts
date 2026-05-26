// Ponto de entrada público do módulo Softbar.
// Consumidores externos importam daqui; nunca de src/softbar/ diretamente.
export { default } from "./src/softbar/Softbar";
export { default as SoftbarModal } from "./src/softbar/SoftbarModal";
export { default as FAIcon } from "./src/softbar/FAIcon";
export { PRODUCTS } from "./src/softbar/softbar.config";
export type { ProductConfig, ModalProduct } from "./src/softbar/types";
