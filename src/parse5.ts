import * as parse5 from 'parse5';

// parse5 monkeypatch
const INSERTION_MODE_IN_HEAD = 3;
const INSERTION_MODE_IN_TEMPLATE = 17;
const _startTagOutsideForeignContent =
    parse5.Parser.prototype._startTagOutsideForeignContent;
const _endTagOutsideForeignContent =
    parse5.Parser.prototype._endTagOutsideForeignContent;

const stack: number[] = [];

parse5.Parser.prototype._startTagOutsideForeignContent =
    function __startTagOutsideForeignContent(token) {
        if (
            this.insertionMode === INSERTION_MODE_IN_HEAD &&
            token.tagID === parse5.html.TAG_ID.UNKNOWN
        ) {
            stack.push(token.tagID);
            token.tagID = parse5.html.TAG_ID.TEMPLATE;
        }

        return _startTagOutsideForeignContent.call(this, token);
    };

parse5.Parser.prototype._endTagOutsideForeignContent =
    function __endTagOutsideForeignContent(token) {
        if (
            this.insertionMode === INSERTION_MODE_IN_TEMPLATE &&
            token.tagID === parse5.html.TAG_ID.UNKNOWN
        ) {
            stack.pop();
            if (stack.length === 0) {
                token.tagID = parse5.html.TAG_ID.TEMPLATE;
                this.openElements.current.childNodes =
                    this.openElements.current.content.childNodes;
                delete this.openElements.current.content;
            }
        }

        return _endTagOutsideForeignContent.call(this, token);
    };

export { parse5 };
