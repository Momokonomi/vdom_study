import VdomOperator from './libs/vdom.js';

/**
 * virtual dom仕組み
 * ・現在表示しているDOM構造をもつ
 * ・変更後のDOMを持つ
 * ・表示と変更後のDOMを比較する
 * ・差があればその部分をレンダーする
 */
window.addEventListener('load', () => {
  const root = document.getElementsByTagName('body')[0];
  const vdomOperator = new VdomOperator(root);
  vdomOperator.apply();

  document.getElementById('input').addEventListener('change', (element) => {
    const changedDom = vdomOperator.currentDom;
    changedDom.detected.children[1].innerHTML = element.target.value;
    vdomOperator.setChangedVDom(changedDom);
    console.log(changedDom.detected.children[1]);
  });
});
