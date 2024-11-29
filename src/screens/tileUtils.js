import * as FileSystem from 'expo-file-system';
import axios from 'axios';

// Directory to store the downloaded tiles locally
const TILE_DIR = FileSystem.documentDirectory + 'tiles/';

// Function to download and save the tile
const downloadTile = async (zoom, x, y) => {
  try {
    // Step 1: Make sure the directory exists or create it
    await FileSystem.makeDirectoryAsync(TILE_DIR, { intermediates: true });

    // Step 2: URL to fetch the tile from OpenStreetMap
    const tileUrl = `https://a.tile.openstreetmap.org/${zoom}/${x}/${y}.png`;

    // Step 3: Fetch the tile image from the URL
    const response = await axios.get(tileUrl, { responseType: 'arraybuffer' });

    // Step 4: Convert the image to base64 format
    const base64Data = response.data.toString('base64');

    // Step 5: Save the tile to your local device
    const tilePath = TILE_DIR + `${zoom}_${x}_${y}.png`;
    await FileSystem.writeAsStringAsync(tilePath, base64Data, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log(`Tile saved at ${tilePath}`);
  } catch (error) {
    console.error('Error downloading tile:', error);
  }
};

// Function to convert latitude, longitude to tile coordinates
const latLonToTile = (lat, lon, zoom) => {
  const x = Math.floor((lon + 180) / 360 * Math.pow(2, zoom));
  const y = Math.floor(
    (1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2 * Math.pow(2, zoom)
  );
  return { x, y };
};

export { downloadTile, latLonToTile };
