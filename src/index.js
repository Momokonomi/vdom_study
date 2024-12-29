import parse from './libs/parse.js';

/**
 * virtual dom仕組み
 * ・現在表示しているDOM構造をもつ
 * ・変更後のDOMを持つ
 * ・表示と変更後のDOMを比較する
 * ・差があればその部分をレンダーする
 */
const initializedDom = {
  root: {
    tag: 'main',
    innerHTML: undefined,
    href: {
      id: undefined,
      className: undefined,
      type: undefined,
      name: undefined,
    },
    children: [
      {
        tag: 'h1',
        innerHTML: '仮想DOMを自作',
        href: {
          id: undefined,
          className: undefined,
          type: undefined,
          name: undefined,
        },
      },
      {
        tag: 'input',
        innerHTML: undefined,
        href: {
          id: 'input',
          className: undefined,
          type: 'text',
          name: undefined,
          placeholder: '入力したら下に入力後の値が表示される',
        },
      },
    ],
  },
  detected: {
    tag: 'div',
    innerHTML: undefined,
    href: {
      id: undefined,
      className: undefined,
      type: undefined,
      name: undefined,
    },
    children: [
      {
        tag: 'h2',
        innerHTML: '変更後(入力を検知)',
        href: {
          id: undefined,
          className: undefined,
          type: undefined,
          name: undefined,
        },
      },
      {
        tag: 'p',
        innerHTML: '',
        href: {
          id: 'inputText',
          className: undefined,
          type: undefined,
          name: undefined,
        },
      },
    ],
  },
};

let currentDom = undefined;
window.addEventListener('load', () => {
  const body = document.getElementsByTagName('body')[0];
  if (!currentDom) {
    currentDom = initializedDom;
  }

  const dom = parse(currentDom);
  body.append(...dom);

  document.getElementById('input').addEventListener('change', (element) => {
    console.log(element.target);
  });
});
