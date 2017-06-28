import scrollIntoViewIfNeeded_ from 'scroll-into-view-if-needed'

export default function scrollIntoViewIfNeeded(el) {
  return scrollIntoViewIfNeeded_(el, true, {
    duration: 300
  })
}
