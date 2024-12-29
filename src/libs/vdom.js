import DomBuilder from './domBuilder.js';

/**
 * VDOMの管理とレンダーの指示を行う
 */
export default class VdomOperator {
  /**初期 */
  static #initializedDom = {
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
  /**現在表示しているDOMのJSON */
  #currentDom;
  /**操作しているDOM */
  #changedDom;
  /**全てのVDOMの親要素 */
  #rootElement;
  /**
   * コンストラクタ
   * @param {HTMLElement} rootElement 全てのVDOMの親要素。VDOMはこれの子オブジェクトとしてレンダーされる
   */
  constructor(rootElement) {
    this.#changedDom = VdomOperator.#initializedDom;
    this.#rootElement = rootElement;
  }

  /**
   * 画面にこれまでの変更を適応し、VDOMの値を更新する
   */
  apply() {
    this.#render(this.#changedDom);
    this.#currentDom = this.#changedDom;
  }
  /**
   * レンダーする
   */
  #render(domJson) {
    this.#rootElement.append(...DomBuilder.parse(domJson));
  }
  /**
   * 変更前と変更後の変化を確認する
   */
  diff() {
    return;
  }
  /**
   * 変更後のVDOMの情報を受け取る
   */
  setChangedVDom(domJson) {
    this.#changedDom = domJson;
  }

  /**
   * 現在レンダされているVDOMの情報を返す
   */
  get currentDom() {
    return this.#currentDom;
  }

  /**
   * 現在保持しているレンダ前の変更後のVDOMの情報を返す
   */
  get changedDom() {
    return this.#changedDom;
  }
}
