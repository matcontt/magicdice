const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

const { resolver } = config;

config.resolver.sourceExts = [
  ...resolver.sourceExts, 
  'cjs', 
  'mjs'
];

config.resolver.assetExts = [
  ...resolver.assetExts, 
  'glb', 
  'gltf', 
  'png', 
  'jpg'
];

module.exports = withNativeWind(config, { input: './global.css' });