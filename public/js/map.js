if (window.mapData && window.mapData.coordinates) {
  maptilersdk.config.apiKey = window.mapData.token;

  const map = new maptilersdk.Map({
    container: "map",
    style: maptilersdk.MapStyle.STREETS,
    center: window.mapData.coordinates,
    zoom: 9,
  });

  new maptilersdk.Marker({ color: "red" })
    .setLngLat(window.mapData.coordinates)
    .addTo(map);
}
