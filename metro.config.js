const { getDefaultConfig } = require('metro-config');

// module.exports = {
//     resolver: {
//       sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs'],
//       assetExts: ['glb', 'gltf', 'mtl', 'obj', 'png', 'jpg'],
//     },
//   }
module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: [...assetExts.filter(ext => ext !== 'svg'), 'glb', 'gltf', 'mtl', 'obj', 'png', 'jpg'],
      // assetExts: ['glb', 'gltf', 'mtl', 'obj', 'png', 'jpg'],
      sourceExts: [...sourceExts, 'svg', 'js', 'jsx', 'json', 'ts', 'tsx', 'cjs'],
    },
  };
})();


