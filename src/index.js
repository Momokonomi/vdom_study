/**
 * virtual dom仕組み
 * ・現在表示しているDOM構造をもつ
 * ・変更後のDOMを持つ
 * ・表示と変更後のDOMを比較する
 * ・差があればその部分をレンダーする
 */
window.addEventListener('load', () => {
  const body = document.getElementsByTagName('body')[0];
  const init = {
    tag: 'p',
    innerText: 'test',
  };

  const p = document.createElement(init.tag);
  p.innerText = init.innerText;
  p.innerHTML = init.innerText;
  body.appendChild(p);
});
