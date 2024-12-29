import domUnit from './domUnit.js';

/**
 * JSON形式のDOM情報からDOM構造を作成する
 */
export default function parse(currentDom) {
  const parsedDom = [];
  for (const root of Object.values(currentDom)) {
    parsedDom.push(parentNodeTree(root));
  }
  return parsedDom;
}

/**
 * 子をもつ親のDom Elementsを作成する\
 * 深さ優先探索
 */
function parentNodeTree(parent) {
  if (!parent) return undefined;

  const parentDom = domUnit(parent);
  if (!parent.children) {
    return parentDom;
  }

  for (const child of parent.children) {
    parentDom.appendChild(parentNodeTree(child));
  }

  return parentDom;
}
