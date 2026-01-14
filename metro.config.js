const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

const { resolver: { sourceExts, assetExts } } = config;

// 1. Forzar extensiones 3D como assets
const gltfExtensions = ['glb', 'gltf'];

config.resolver.assetExts = [...assetExts, ...gltfExtensions];

// 2. Asegurarse de que NO estén en sourceExts para evitar conflictos
config.resolver.sourceExts = [...sourceExts, 'cjs', 'mjs'].filter(
  ext => !gltfExtensions.includes(ext)
);

module.exports = withNativeWind(config, { input: './global.css' });