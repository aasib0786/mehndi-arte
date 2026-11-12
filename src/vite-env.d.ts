/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LEADS_WEBHOOK_URL?: string;
  readonly VITE_META_PIXEL_ID?: string;
  readonly VITE_GA4_ID?: string;
  readonly VITE_GADS_ID?: string;
  readonly VITE_GADS_CONVERSION_LABEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

