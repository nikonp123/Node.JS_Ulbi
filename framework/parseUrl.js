module.exports = (baseUrl) => (req, res) => {
  const parsedUrl = new URL(req.url, baseUrl);
  const params = {};
  parsedUrl.searchParams.forEach((value, key) => (params[key] = value));
  //   console.log(parsedUrl);
  //   console.log(params);
  req.pathname = parsedUrl.pathname;
  req.params = params;
};
