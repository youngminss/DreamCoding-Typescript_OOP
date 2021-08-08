export interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
}

/**
 * BaseComponent 의 존재 => 컴포넌트들의 Encapsulation 이 가능해졌다.
 */
export class BaseComponent<T extends HTMLElement> {
  protected readonly element: T;
  constructor(htmlString: string) {
    const template = document.createElement('template');
    template.innerHTML = htmlString;
    this.element = template.content.firstElementChild! as T;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.element);
  }
}
