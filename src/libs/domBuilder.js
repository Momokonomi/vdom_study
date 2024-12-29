/**
 * VDOMのJSONからDOMを作成する
 */
export default class DomBuilder {
  /**
   * JSON形式のDOM情報からDOM構造を作成する
   */
  static parse(domJson) {
    const parsedDom = [];
    for (const root of Object.values(domJson)) {
      parsedDom.push(DomBuilder.parentNodeTree(root));
    }
    return parsedDom;
  }
  /**
   * 子をもつ親のDom Elementsを作成する\
   * 深さ優先探索
   */
  static parentNodeTree(parent) {
    if (!parent) return undefined;

    const parentDom = DomBuilder.domUnit(parent);
    if (!parent.children) {
      return parentDom;
    }

    for (const child of parent.children) {
      parentDom.appendChild(DomBuilder.parentNodeTree(child));
    }

    return parentDom;
  }
  /**
   * 単一のDOM Elementを生成する
   * @param {{tag: string,innerHTML:string,href:{keys:string}}} domJson
   * @returns
   */
  static domUnit(domJson) {
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
}
