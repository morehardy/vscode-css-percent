import * as vscode from 'vscode';
import CSSPercent from './process';

class CSSPercentProvider implements vscode.CompletionItemProvider {
  constructor (private process: CSSPercent) {}

  provideCompletionItems (
    document: vscode.TextDocument,
    position: vscode.Position
  ): Thenable<vscode.CompletionItem[]> {
    return new Promise((resolve, reject) => {
      const lineText = document.getText(new vscode.Range(position.with(undefined, 0), position));
      const result = this.process.cover(lineText);
      if (!result) {
        return resolve([]);
      }

      const item = new vscode.CompletionItem(`${result.pxValue}px => ${result.percentValueStr}`, vscode.CompletionItemKind.Snippet);
      item.insertText = result.percentValueStr;
      return resolve([item]);
    });
  }

}

export default CSSPercentProvider;
