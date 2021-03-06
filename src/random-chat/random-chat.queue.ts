export class RanDomChatQueue<T> {
  private _queue;
  private _head: number;
  private _tail: number;

  constructor() {
    this._queue = {};
    this._head = 0;
    this._tail = 0;
  }

  get isEmpty() {
    return this.size === 0;
  }

  get size() {
    return this._tail - this._head;
  }

  enqueue(value: T): void {
    this._queue[this._tail] = value;
    this._tail++;
  }

  dequeue(): T {
    if (this.isEmpty) return undefined;
    const value = this._queue[this._head];
    delete this._queue[this._head];
    this._head++;
    return value;
  }

  clear(): void {
    this._queue = {};
    this._head = 0;
    this._tail = 0;
  }

  print(): string {
    if (this.isEmpty) {
      return '';
    }
    const values = [];
    for (let i = this._head; i < this._tail; i++) {
      values.unshift(this._queue[i].toString());
    }
    return values.join(' -> ');
  }
}
