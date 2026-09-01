// ─── CLARYN Type Definitions ─────────────────────────────────────────────────
// Source of truth: CLARYN-website-master-prompt.md

export type ProductCategory =
  | 'ro-membranes'
  | 'ro-systems'
  | 'filters'
  | 'pumps'
  | 'testing'
  | 'smart-water'
  | 'commercial';

export type ProductStatus = 'active' | 'coming_soon' | 'discontinued';
export type Availability  = 'in_stock' | 'out_of_stock' | 'unknown';

export interface MarketplaceLink {
  id:              string;
  productId:       string;
  marketplaceName: string;
  url:             string;
  region:          string;
  availability:    Availability;
  displayOrder:    number;
  ctaLabel:        string;
  isActive:        boolean;
  mrp?:            number;       // Maximum Retail Price in INR
  offerPrice?:     number;       // Current selling price in INR
  badge?:          string;       // e.g. 'Bestseller', 'Prime' etc.
}

export interface ProductDownload {
  id:      string;
  label:   string;
  fileUrl: string;
  type:    'datasheet' | 'manual' | 'guide' | 'certificate' | 'other';
}

export interface ProductSpecs {
  gpd?:                    number;
  membraneLayers?:         number;
  maxTDS?:                 number;
  saltRejectionPercent?:   number;
  membraneMaterial?:       string;
  operatingPressure?:      string;
  operatingTemperature?:   string;
  dimensions?:             string | null;
  weight?:                 string | null;
  flowRate?:               string | null;
  compatibility?:          string[];
  warrantyPeriod?:         string;
  [key: string]:           unknown;
}

export interface Product {
  id:                    string;
  slug:                  string;
  name:                  string;
  model:                 string;
  category:              ProductCategory;
  subcategory?:          string;
  shortDescription:      string;
  longDescription:       string;
  images:                string[];
  specs:                 ProductSpecs;
  benefits:              string[];
  applications:          string[];
  suitableFor:           string[];
  installationGuideSlug?: string;
  downloads:             ProductDownload[];
  warrantyPolicyId?:     string;
  faqIds:                string[];
  relatedProductIds:     string[];
  marketplaceLinks:      MarketplaceLink[];
  status:                ProductStatus;
  seoTitle?:             string;
  seoDescription?:       string;
}

export interface FAQ {
  id:                string;
  question:          string;
  answer:            string;
  category:          string;
  relatedProductIds: string[];
  displayOrder:      number;
}

export interface KnowledgeArticle {
  id:              string;
  slug:            string;
  category:        string;
  title:           string;
  summary:         string;
  content:         string;
  readTimeMinutes: number;
  isPublished:     boolean;
  publishedAt?:    string;
  keywords?:       string[];
  seoTitle?:       string;
  seoDescription?: string;
}

export interface KnowledgeCategory {
  slug:  string;
  label: string;
}

export interface InstallationStep {
  stepNumber:  number;
  title:       string;
  description: string;
  warning?:    string;
}

export interface InstallationGuide {
  id:                string;
  slug:              string;
  title:             string;
  productIds:        string[];
  requiredTools:     string[];
  steps:             InstallationStep[];
  commonMistakes:    string[];
  troubleshooting:   { problem: string; solution: string }[];
  downloadablePdfUrl?: string;
  relatedProductIds: string[];
}
