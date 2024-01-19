const decodeURI = (cookie) => {
  return decodeURIComponent(cookie).match(/"([^"]+)"/)[1];
}

export default decodeURI;