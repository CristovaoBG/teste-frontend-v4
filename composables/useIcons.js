import { ref } from 'vue'

export function useIcons() {

  const iconSize = 50;

  const harvesterIcon = L.icon({
    iconUrl: 'icons/harvester.png', // caminho para seu ícone customizado
    iconSize: [iconSize, iconSize], // tamanho do ícone
    iconAnchor: [22, 38], // âncora do ícone, onde o ponto do ícone será "fixado" no mapa
    popupAnchor: [-3, -76], // âncora do popup em relação ao ícone
  });
  const caminhao = L.icon({
    iconUrl: 'icons/caminhao.png', // caminho para seu ícone customizado
    iconSize: [iconSize, iconSize], // tamanho do ícone
    iconAnchor: [22, 38], // âncora do ícone, onde o ponto do ícone será "fixado" no mapa
    popupAnchor: [-3, -76], // âncora do popup em relação ao ícone
  });
  const garra = L.icon({
    iconUrl: 'icons/garra.png', // caminho para seu ícone customizado
    iconSize: [iconSize, iconSize], // tamanho do ícone
    iconAnchor: [22, 38], // âncora do ícone, onde o ponto do ícone será "fixado" no mapa
    popupAnchor: [-3, -76], // âncora do popup em relação ao ícone
  });
  return {
    harvesterIcon,
    caminhao,
    garra
  }
}