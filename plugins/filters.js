import Vue from 'vue';

Vue.filter('shortenText', function(text, maxLength = 300) {
  if (text && typeof text === 'string') {
    const finalChar = text.length > maxLength ? '...' : ''
    return text.substr(0, maxLength) + finalChar
  }

  return ''
})
