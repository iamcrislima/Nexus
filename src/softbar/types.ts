import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface ProductConfig {
  id: string;
  label: string;
  description: string;
  url: string;
  badge: string;
  tagline: string;
  longDesc: string;
  features: string[];
  chips: string[];
  icon: IconDefinition;
}

export interface ModalProduct extends Partial<ProductConfig> {
  id: string;
  label: string;
  soon?: boolean;
}
