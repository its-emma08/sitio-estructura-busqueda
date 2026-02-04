export type SiteItemType = 'pagina' | 'seccion';

export interface SiteItem {
  id: string;
  tittle: string;
  description: string;
  path: string;          
  type: SiteItemType;
  section: string;
  keywords: string[];
  otro?: String;
};

export const SITE_INDEX: SiteItem[] = [
    {
        id: 'inicio',
        tittle: 'Inicio',
        description: 'Página principal del sitio de práctica.',
        path: '/',
        type: 'pagina',
        section: 'Estructura del sitio',
        keywords: ['inicio', 'principal', 'home', 'estructura'],
        otro: "asdasd"
    },
    {
        id: 'elementos',
        tittle: 'Elementos del Sitio',
        description: 'Identifica los elementos que componen un sitio web.',
        path: '/elementos',
        type: 'pagina',
        section: 'Estructura del sitio',
        keywords: ['elementos', 'sitio', 'header', 'footer', 'main', 'layout'],
    },
    {
        id: 'menu',
        tittle: 'Menú',
        description: 'Elementos principales del menú web y su utilidad.',
        path: '/menu',
        type: 'pagina',
        section: 'Navegación',
        keywords: ['menu', 'navegacion', 'navbar', 'links', 'persistente'],
    },
    {
        id: 'breadcrumbs',
        tittle: 'Breadcrumbs',
        description: 'Describe el funcionamiento y la utilidad de los breadcrumbs.',
        path: '/breadcrumbs',
        type: 'pagina',
        section: 'Navegación',
        keywords: ['breadcrumbs', 'migas', 'ruta' ,'navegacion', 'ux'],
    },
    {
        id: 'mapa',
        tittle: 'Mapa del Sitio',
        description: 'Diseño del mapa del sitio y su relacion con la navegación.',
        path: '/mapa-sitio',
        type: 'pagina',
        section: 'Estructura del sitio',
        keywords: ['mapa', 'sitio', 'sitemap', 'estructura', 'rutas'],
    },
    {
        id: 'error404',
        tittle: 'Error 404',
        description: 'Página para rutas no existentes (404).',
        path: '/no-existe',
        type: 'seccion',
        section: 'Errores',
        keywords: ['404', 'error', 'no encontrado', 'ruta'],
    },
];