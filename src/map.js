import MapView from "esri/views/MapView";
import EsriMap from "esri/Map";
import FeatureLayer from "esri/layers/FeatureLayer";

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

        // load example feature layer from Arcgis Online
        const featureLayer = new FeatureLayer({
            url:
                "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Major_Cities/FeatureServer/0"
        });
        this.map.add(featureLayer);

        featureLayer.when(() => {
            this.view.goTo({target: featureLayer.fullExtent})
        })
    }
}