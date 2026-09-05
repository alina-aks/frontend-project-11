const buildProxyUrl = (url) => {
  const encodedUrl = encodeURIComponent(url);

  const proxyUrl = "https://allorigins.hexlet.app/get?disableCache=true&url="+encodedUrl
  return proxyUrl
}

export default buildProxyUrl;