/**
 * Json上のdom定義から単一のDOM Elementを作成する
 */
export default function domUnit(domJson) {
  const dom = document.createElement(domJson.tag);
  dom.innerHTML = domJson.innerHTML ?? '';
  //属性追加
  for (const href of Object.keys(domJson.href)) {
    if (!dom[href]) {
      continue;
    }
    dom[href] = domJson[href];
  }
  return dom;
}
