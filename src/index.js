import parse from './libs/parse.js';

/**
 * virtual dom仕組み
 * ・現在表示しているDOM構造をもつ
 * ・変更後のDOMを持つ
 * ・表示と変更後のDOMを比較する
 * ・差があればその部分をレンダーする
 */
window.addEventListener('load', () => {
  const body = document.getElementsByTagName('body')[0];
  const currentDom = {
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
          innerHTML: '仮想DOMを自作する',
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
            id: undefined,
            className: undefined,
            type: 'password',
            name: undefined,
          },
        },
      ],
    },
  };

  const dom = parse(currentDom);
  body.append(...dom);
});
