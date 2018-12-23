'use strict';
import * as vscode from 'vscode';
import CSSPercent from './process';
import CSSPercentProvider from './provider';

let config;

export function activate(context: vscode.ExtensionContext) {

    config = vscode.workspace.getConfiguration('CSSPercent');

    const process = new CSSPercent(config);
    const provider = new CSSPercentProvider(process);

    const TYPES = [
        'html',
        'vue',
        'css',
        'less',
        'scss',
        'sass',
        'stylus'
    ];

    TYPES.forEach(item => {
        let providerDisposable = vscode.languages.registerCompletionItemProvider(
            {
                scheme: 'file',
                language: item
            },
            provider,
            'w',
            'h'
        );
        context.subscriptions.push(providerDisposable);
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}