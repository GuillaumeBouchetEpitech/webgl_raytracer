
export class ObjectPool<T, TArgs extends any[]> {
// class ObjectPool<T extends ClassDecoratorContext, TArgs extends ConstructorParameters<typeof T>> {

  private _poolFree: T[] = [];
  private _poolUsed: T[] = [];

  private _onCreateCallback: (...args: TArgs) => T;
  private _onInitCallback: (instance: T, ...args: TArgs) => void;

  constructor(
    onCreateCallback: (...args: TArgs) => T,
    onInitCallback: (instance: T, ...args: TArgs) => void,
  ) {
    this._onCreateCallback = onCreateCallback;
    this._onInitCallback = onInitCallback;
  }

  acquire(...args: TArgs): T {
    // try to acquire
    if (this._poolFree.length > 0) {
      const reusedNode = this._poolFree.pop()!;
      this._onInitCallback(reusedNode, ...args);
      return reusedNode;
    }

    // create
    const newNode = this._onCreateCallback(...args);
    this._poolUsed.push(newNode);
    return newNode;
  }

  releaseAll() {
    // add the used node to the pool of free
    for (const currNode of this._poolUsed) {
      this._poolFree.push(currNode);
    }
    // clear the pool of used ones
    this._poolUsed.length = 0;
  }

};
