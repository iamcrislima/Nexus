import type React from "react";

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
  Icon: React.ComponentType;
}

export interface ModalProduct extends Partial<ProductConfig> {
  id: string;
  label: string;
  soon?: boolean;
}
