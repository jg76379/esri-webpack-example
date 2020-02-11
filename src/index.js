import "./esriWebpackConfig";

import {MainMap} from './map';

import 'node_modules/arcgis-js-api/themes/light/main.css';
import './main.css';


function main(){
    const viewDiv = document.getElementById("viewDiv")
    const mainMap = new MainMap(viewDiv);
}

main();