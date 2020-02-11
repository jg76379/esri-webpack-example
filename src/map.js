import MapView from "esri/views/MapView";
import EsriMap from "esri/Map";

export class MainMap {

    constructor(viewContainer) {
        this.map = new EsriMap({
            basemap: "streets",
            layers: []
          });
          
          this.view = new MapView({
            container: viewContainer,
            map: this.map,
            zoom: 4, 
            center: [15, 65]
          });
    }
}