const someArray = [
  { id: 5, parent: true },
  { id: 1, parent: 0x11, type: undefined },
  { id: 3, parent: "true", type: "null" },
  { id: 4, parent: 2, type: 1 },
  { id: 8, parent: 2, type: "test" },
  { id: 6, parent: "2", type: "0" },
  { id: 7, parent: 4, type: null },
  { id: 9, parent: true, type: null },
];

interface TreeNode {
  id: number | string | null | undefined;
  parent: number | string | boolean | null | undefined;
  type?: string | number | null | undefined;
}

class Tree<T extends TreeNode> {
  private items: Record<string | number, T> = {};

  constructor(parameters: T[]) {
    for (const item of parameters) {
      //Индексируем массив по id
      this.items[String(item.id)] = item;
    }
  }

  getAll(): T[] {
    //Функция Object.values() возвращает массив значений перечисляемых свойств объекта в том же порядке, что и цикл for...in
    return Object.values(this.items);
  }

  getItem(id: string | number): T | undefined {
    // Возвращает значение, связанное с указанным ключом, или undefined, если ключ не найден.
    return this.items[String(id)];
  }

  getChildren(id: string | number): T[] {
    // Возвращает массив значений, соответствующих ключам, найденным в объекте.
    return Object.values(this.items).filter((item) => item.parent === id);
  }

  getAllChildren(id: string | number): T[] {
    const children = this.getChildren(id);
    let allChildren: T[] = [...children];

    for (const child of children) {
      allChildren = allChildren.concat(this.getAllChildren(String(child.id)));
    }
    // Возвращает новый массив, состоящий из массива, на котором он был вызван, соединённого с другими массивами и/или значениями, переданными в качестве аргументов.
    return allChildren;
  }

  getAllParents(id: string | number): T[] {
    const parents: T[] = [];
    let currentId: string | number | null | undefined = id;

    while (
      currentId !== undefined &&
      this.items[String(currentId)]?.parent !== undefined
    ) {
      const parent: string | number | boolean | null | undefined =
        this.items[String(currentId)].parent;
      if (parent !== null && parent !== undefined) {
        parents.unshift(this.items[String(parent)]);
      }
      currentId = parent as string | number | null | undefined;
    }
    // Возвращает новый массив, состоящий из массива, на котором он был вызван, соединённого с другими массивами и/или значениями, переданными в качестве аргументов.
    return parents;
  }
}

const ts = new Tree(someArray);

console.log(ts.getAll());
console.log(ts.getItem(7));
console.log(ts.getChildren(4));
console.log(ts.getChildren(5));
console.log(ts.getChildren(2));
console.log(ts.getAllChildren(2));
console.log(ts.getAllParents(7));

