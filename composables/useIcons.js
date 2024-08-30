import { ref } from 'vue'

export async function useIcons() {

const createSvgIcon = (color) => {

    const svg = `
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 4.43 7 11 7 11s7-6.57 7-11c0-3.87-3.13-7-7-7zm0 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="${color}"/>
      </svg>
    `;
    return ref(L.divIcon({
      className: 'custom-icon',
      html: svg,
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    }));
  };
  
  const colors = [
      "#FF6666",
      "#66FF66",
      "#6666FF",
      "#6A6D91",
      "#66C2C2",
      "#66FFFF",
      "#FF9966",
      "#9966CC",
      "#66FF66",
      "#FFB3B3",
      "#A57F7F",
      "#B3B3B3",
      "#FFD966",
      "#FFFF66",
      "#FF66FF"
  ]
  
  // Definir ícone com cor desejada
  const icons = colors.map(color => createSvgIcon(color));

    return {
        icons
    }
}