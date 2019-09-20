/*eslint-env jquery*/

const fetch = (url, destElem) => {
  $.ajax({
    type: 'GET',
    url,
    processData: false,
    contentType: false,
    success: html => {
      destElem.html(html)
    },
  })
}

const activateFetch = () => {
  $('[fetchurl]').each((i, elem) => {
    const parent = elem.closest('details')
    const el = $(elem)
    $(parent).on('toggle', () => {
      if (parent.open) {
        fetch(el.attr('fetchurl'), el)
      }
      else {
        el.html('...')
      }
    })
  })
}

/* main
 *
 */

$(() => {
  activateFetch()
})
