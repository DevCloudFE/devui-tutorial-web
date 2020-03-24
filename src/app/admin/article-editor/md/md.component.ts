import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown.js';
import * as marked from 'marked';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-md',
  templateUrl: './md.component.html',
  styleUrls: ['./md.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MarkdownComponent implements AfterViewInit {
  @Input() content: string;

  @Output() contentChange = new EventEmitter();

  @ViewChild('mdEditor', { static: true }) mdEditor;
  @ViewChild('previewContainer', { static: true }) previewContainer;

  // codemirror对象
  public cm;
  // 标记当前滚动容器
  cScroll = false;
  pScroll = false;

  /*ToolBar*/
  public toolbarHandler = {
    /*撤销*/
    undo: () => {
      this.cm.undo();
    },

    /*重做*/
    redo: () => {
      this.cm.redo();
    },

    /*粗体*/
    bold: () => {
     this.insertFontStyle('**');
    },

    /*斜体*/
    italic: () => {
      this.insertFontStyle('*');
    },

    /*一级标题*/
    h1: () => {
      this.insertParagraph('#');
    },

    /*二级标题*/
    h2: () => {
      this.insertParagraph('##');
    },

    /*无序列表*/
    ul: () => {
      const selection = this.cm.getSelection();
      this.cm.focus();
      if (selection === '') {
        this.cm.replaceSelection('- ' + selection);
      } else {
        const selectionText = selection.split('\n');

        for (let i = 0, len = selectionText.length; i < len; i++) {
          selectionText[i] =
            selectionText[i] === '' ? '' : '- ' + selectionText[i];
        }

        this.cm.replaceSelection(selectionText.join('\n'));
      }
    },

    /*有序列表*/
    ol: () => {
      // const cursor = this.cm.getCursor();
      const selection = this.cm.getSelection();
      this.cm.focus();
      if (selection === '') {
        this.cm.replaceSelection('1. ' + selection);
      } else {
        const selectionText = selection.split('\n');

        for (let i = 0, len = selectionText.length; i < len; i++) {
          selectionText[i] =
            selectionText[i] === '' ? '' : i + 1 + '. ' + selectionText[i];
        }

        this.cm.replaceSelection(selectionText.join('\n'));
      }
    },
    // 下划线
    underline: () => {
      const cursor = this.cm.getCursor();
      const selection = this.cm.getSelection();
      this.cm.focus();
      this.cm.replaceSelection('<ins>' + selection + '</ins>');
      if (selection === '') {
        this.cm.setCursor(cursor.line, cursor.ch + 5);
      }
    },
    /* 表格 */
    table: () => {
      const table = '|  |  |  |' + '\n' + '|--|--|--|' + '\n' + '|  |  |  |';
      this.cm.replaceSelection(table);
    }
  };

  insertParagraph(type) {
    const cursor = this.cm.getCursor();
    const selection = this.cm.getSelection();
    this.cm.focus();
    if (cursor.ch !== 0) {
      this.cm.setCursor(cursor.line, 0);
      this.cm.replaceSelection(type + ' ' + selection);
      this.cm.setCursor(cursor.line, cursor.ch + type === '#' ? 2 : 3);
    } else {
      this.cm.replaceSelection(type + ' ' + selection);
    }
  }

  insertFontStyle(type) {
    const cursor = this.cm.getCursor();
    const selection = this.cm.getSelection();

    this.cm.replaceSelection(type + selection + type);
    this.cm.focus();
    if (selection === '') {
      this.cm.setCursor(cursor.line, cursor.ch + type === '*' ? 1 : 2);
    }
  }

  constructor() {}

  ngAfterViewInit() {
    const myTextarea = this.mdEditor.nativeElement;
    this.cm = CodeMirror.fromTextArea(myTextarea, {
      mode: 'markdown',
      lineNumbers: true,
      lineWrapping: true
    });
    this.cm.setSize('auto', '100%');
    this.cm.focus();

    /*绑定变化事件*/
    this.cm.on('change', () => {
      /*内容上传*/
      this.content = this.cm.getValue();
      this.contentChange.emit(this.content);
      let timer = setTimeout(() => {
        clearTimeout(timer);
        this.saveToHTML();
        timer = null;
      }, 300);
    });
    this.cm.on('scroll', instance => {
      if (this.cScroll) {
        this.cScroll = false;
        return;
      }
      this.pScroll = true;
      this.editorScroll(instance);
    });

    // 立刻执行一次emit content
    setTimeout(() => {
      this.contentChange.emit(this.cm.getValue());
      this.saveToHTML();
      const preview = this.previewContainer.nativeElement;
      // preview初始化绑定scroll事件
      fromEvent<any>(preview, 'scroll').subscribe(e => {
        if (this.pScroll) {
          this.pScroll = false;
          return;
        }
        this.previewScroll(preview);
      });
    }, 100);
  }

  /*获取编辑器内容并显示*/
  saveToHTML() {
    const cmValue = this.cm.getValue();
    const htmlContent = marked(cmValue, {
      breaks: true
    });
    this.previewContainer.nativeElement.innerHTML = htmlContent;
  }

  // 处理editor滚动条
  editorScroll(instance) {
    const scrollInfo = this.cm.getScrollInfo();
    const height = scrollInfo.height - scrollInfo.clientHeight;
    const ratio = parseFloat(scrollInfo.top) / height;
    const preview = this.previewContainer.nativeElement;
    const move = (preview.scrollHeight - preview.clientHeight) * ratio;
    preview.scrollTop = move;
  }

  // 处理preview滚动条
  previewScroll(preview) {
    this.cScroll = true;
    const height = preview.scrollHeight - preview.clientHeight;
    const ratio = parseFloat(preview.scrollTop) / height;
    const move =
      (this.cm.getScrollInfo().height - this.cm.getScrollInfo().clientHeight) *
      ratio;
    this.cm.scrollTo(0, move);
  }
}
