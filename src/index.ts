/**
 * virtual dom仕組み
 * ・現在表示しているDOM構造をもつ
 * ・変更後のDOMを持つ
 * ・表示と変更後のDOMを比較する
 * ・差があればその部分をレンダーする
 */
window.addEventListener('load', () => {
  const body = document.getElementsByTagName('body');

  const p = document.createElement('p');
  p.innerHTML = 'test';
  p.textContent = 'test';
  body[0].appendChild(p);
});
