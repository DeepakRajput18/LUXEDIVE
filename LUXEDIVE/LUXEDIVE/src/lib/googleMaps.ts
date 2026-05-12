import { setOptions, importLibrary } from "@googlemaps/js-api-loader"

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""

setOptions({
  key: API_KEY,
  v: "weekly"
})

export const loadGoogleMapsLibraries = async () => {
  // Direct importLibrary for multiple libraries
  const [maps, places, geometry] = await Promise.all([
    importLibrary("maps"),
    importLibrary("places"),
    importLibrary("geometry")
  ]);
  return { maps, places, geometry };
}
