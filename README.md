# ESRI Webpack Example

Basic example of modern web map app using the ArcGIS Javascript API, Webpack, and Babel.

Uses Webpack and the [`@arcgis/webpack-plugin`](https://github.com/esri/arcgis-webpack-plugin) to 
enable loading ArcGIS JS API modules with ES6 imports.

Uses Babel with Webpack's babel-loader to compile modern Javascript code.

## Install dependencies

```
npm install
```

## Start webpack dev server

Start the webpack dev server to serve the app on localhost and build the 
project with live reloading.

```
npm start
```


## Generate a build 

Generate a production build, you can then serve the '/dist' folder.

```
npm run build
```