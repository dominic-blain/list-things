import url from 'url';
import axios from 'axios';
import { getMetas } from './_getMetas';

export function get(req, res) {
  const externalUrl = url.parse(req.url, true).query.url;

  axios.get(externalUrl)
  .then(response => {
    const html = response.data;
    const metas = getMetas(html);
    res.end(JSON.stringify(metas));
  })
  .catch(error => {
    res.end(JSON.stringify(error));
  })
}