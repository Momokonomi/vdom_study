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
        id: 'main',
        className: undefined,
        type: undefined,
        name: undefined,
      },
      children: [
        {
          tag: 'h1',
          innerHTML: '仮想DOMを自作',
          href: {
            id: 'title',
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
        id: 'next-section',
        className: undefined,
        type: undefined,
        name: undefined,
      },
      children: [
        {
          tag: 'h2',
          innerHTML: '変更後(入力を検知)',
          href: {
            id: 'changed-title',
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
    const diffArray = this.#diff();
    this.#render(diffArray);
    this.#currentDom = this.#changedDom;
    console.log('change!');
  }

  /**
   * 画面に差分を反映する
   * @param {[id: number | undefined, domJson: {tag:string,innerHTML: string | undefined, href:{},children: [] | undefined}[] | undefined][]} diffArray
   * @returns
   */
  #render(diffArray) {
    const removeAll = () => {
      this.#rootElement.replaceChildren();
    };
    /**
     *
     * @param {{tag:string,innerHTML: string | undefined, href:{},children: [] | undefined}[] domJson
     */
    const parse = (domJsons) => {
      return domJsons.map((json) => {
        return DomBuilder.parse(json);
      });
    };
    for (const [targetId, afterDomJson] of diffArray) {
      if (targetId === undefined && afterDomJson === undefined) {
        removeAll();
        continue;
      }
      if (targetId === undefined) {
        removeAll();
        const afterDom = parse(afterDomJson);
        this.#rootElement.append(...afterDom);
        continue;
      }
      if (afterDomJson === undefined) {
        document.getElementById(targetId).remove();
        continue;
      }
      const afterDom = parse(afterDomJson);
      const targetDom = document.getElementById(targetId);
      targetDom.replaceWith(...afterDom);
    }
  }
  /**
   * 変更前と要素のidと変更後の要素のJSONの配列を返す
   */
  #diff() {
    //変更対象のidと変更後の要素を格納した配列を返す。
    /**[[変更対象ID(undefinedは全体置き換え), 変更後DOMのJSON(undefinedは削除)[]],...,[]]*/
    const diffArray = [];
    if (this.currentDom === undefined) {
      diffArray.push([
        undefined,
        [this.changedDom.root, this.changedDom.detected],
      ]);
      return diffArray;
    }
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
