var ghpages = require('gh-pages')

ghpages.publish(__dirname, {
  src: ['dist/**/*', 'images/**/*', 'music/**/*', 'sounds/**/*', 'index.html']
}, function(err) {
  if (err) {
    console.log('Error:', err)
  }
})
