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

  const dom = parse(currentDom);
  body.append(...dom);
});
