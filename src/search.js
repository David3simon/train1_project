export default function debounce1(fn,delay) {
  let timer = null
  // console.log(22);
  return function() {
    if(timer) {
      clearTimeout(timer)
    }
    // console.log(33);
    timer = setTimeout(fn,delay)
  }
}