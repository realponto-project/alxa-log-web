var userAgent = navigator.userAgent || navigator.vendor || window.opera;
const isMobile = /windows phone/i.test(userAgent) || /android/i.test(userAgent) || (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)

export default isMobile
