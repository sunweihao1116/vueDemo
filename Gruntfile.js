
module.exports = (grunt) => {
  grunt.initConfig({
    svgstore: {
      options: {
        prefix: 'icon-',
        inheritviewbox: true,
        cleanup: true,
        svg: {
          viewBox: '0 0 100 100',
          // xmlns: 'http://www.w3.org/2000/svg',
        },
        includedemo: true,
      },
      default: {
        files: {
          './src/assets/svgfile.svg': ['./src/assets/svg/*.svg'], //生成位置  和 源svg位置
        },
      },
    },
  });
  // 载入grunt-svgstore
  grunt.loadNpmTasks('grunt-svgstore');
  // 注册任务
  grunt.registerTask('default', ['svgstore']);
};
