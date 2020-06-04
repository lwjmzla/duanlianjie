module.exports = {
  // configureWebpack: {
  //   externals: {
  //     QRCode: "QRCode"
  //   }
  // }
  configureWebpack: (config) => {
    config.externals = {
      QRCode: 'QRCode', // !后者为全局变量 window.QRCode  前者为别名而已
      $: '$',
      jQuery: 'jQuery'
    };
  }
};
