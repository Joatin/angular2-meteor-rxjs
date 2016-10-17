export default {
    format: 'umd',
    entry: './dist/index.js',
    dest: './dist/bundles/index.umd.js',
    moduleName: 'angular2.meteor.rxjs',
    globals: {
        'rxjs':'rxjs'
    }
};