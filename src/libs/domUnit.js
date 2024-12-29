/**
 * Json上のdom定義から単一のDOM Elementを作成する
 */
export default function domUnit(domJson) {
  const dom = document.createElement(String(domJson.tag));
  dom.innerHTML = domJson.innerHTML ?? '';
  //属性追加
  for (const href of Object.keys(domJson.href)) {
    if (!domJson.href[href]) {
      continue;
    }
    dom.setAttribute(href, domJson.href[href]);
  }

  return dom;
}
