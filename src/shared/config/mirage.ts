/** Mock API через Mirage (dev и prod). Отключить: VITE_USE_MIRAGE=false */
export const useMirageApi = import.meta.env.VITE_USE_MIRAGE !== 'false'
