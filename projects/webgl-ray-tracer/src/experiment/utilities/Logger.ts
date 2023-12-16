export class Logger {
  private _textAreaElement: HTMLTextAreaElement;

  private _lines: string[] = [];
  private _maxLines = 30;

  constructor(textAreaElementId: string) {
    this._textAreaElement = document.getElementById(
      textAreaElementId
    ) as HTMLTextAreaElement;

    if (!this._textAreaElement)
      throw new Error(`DOM elements not found, id=${textAreaElementId}`);

    this._textAreaElement.value = ''; // <= clear any browser cache
  }

  log(...args: any[]) {
    if (args.length === 0) return;

    const text = Array.prototype.slice.call(args).join(' ');

    console.log(text);

    this._pushText(text);
  }

  error(...args: any[]) {
    if (args.length === 0) return;

    const text = Array.prototype.slice.call(args).join(' ');

    console.error(text);

    this._pushText(`[ERR] - ${text}`);
  }

  _pushText(text: string) {
    this._lines.push(text);
    if (this._lines.length > this._maxLines)
      this._lines.splice(0, this._lines.length - this._maxLines);

    this._textAreaElement.value = `${this._lines.join('\n')}\n`;

    // force focus on last line
    this._textAreaElement.scrollTop = this._textAreaElement.scrollHeight;
  }

  peekLast() {
    if (this._lines.length > 0) return this._lines[this._lines.length - 1];
    return undefined;
  }

  popLast() {
    if (this._lines.length > 0) this._lines.splice(this._lines.length - 1, 1);
  }
}
