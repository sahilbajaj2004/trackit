import * as vscode from "vscode";
import * as path from "path";

// ─── Types ───────────────────────────────────────────────────────────────────

interface TodoItem {
  file: vscode.Uri;
  line: number;
  text: string;
  tag: "TODO" | "FIXME" | "HACK";
}

// ─── Tree Item ────────────────────────────────────────────────────────────────

class TodoTreeItem extends vscode.TreeItem {
  constructor(public readonly todo: TodoItem) {
    super(todo.text, vscode.TreeItemCollapsibleState.None);

    this.description = `${path.basename(todo.file.fsPath)}:${todo.line + 1}`;
    this.tooltip = `${todo.file.fsPath}:${todo.line + 1}`;
    this.iconPath = new vscode.ThemeIcon(
      todo.tag === "FIXME"
        ? "bug"
        : todo.tag === "HACK"
        ? "warning"
        : "circle-outline"
    );
    this.command = {
      command: "trackit.openItem",
      title: "Open",
      arguments: [todo],
    };
  }
}

// ─── Tree Data Provider ───────────────────────────────────────────────────────

class TrackitProvider implements vscode.TreeDataProvider<TodoTreeItem> {
  private _onDidChangeTreeData = new vscode.EventEmitter<void>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  private todos: TodoItem[] = [];

  async refresh() {
    this.todos = await scanWorkspace();
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: TodoTreeItem) {
    return element;
  }

  getChildren(): TodoTreeItem[] {
    if (this.todos.length === 0) {
      return [];
    }
    return this.todos.map((t) => new TodoTreeItem(t));
  }
}

// ─── Workspace Scanner ────────────────────────────────────────────────────────

async function scanWorkspace(): Promise<TodoItem[]> {
  const results: TodoItem[] = [];
  const TAG_REGEX = /(?:\/\/|#|<!--|\/\*)\s*(TODO|FIXME|HACK):?\s*(.+?)(?:\s*-->|\s*\*\/)?$/gi;

  const files = await vscode.workspace.findFiles(
    "**/*.{ts,js,tsx,jsx,py,java,cpp,c,cs,go,rb,rs,html,css,vue,svelte}",
    "**/node_modules/**"
  );

  for (const file of files) {
    const doc = await vscode.workspace.openTextDocument(file);
    for (let i = 0; i < doc.lineCount; i++) {
      const lineText = doc.lineAt(i).text;
      const match = TAG_REGEX.exec(lineText);
      TAG_REGEX.lastIndex = 0;
      if (match) {
        results.push({
          file,
          line: i,
          tag: match[1].toUpperCase() as TodoItem["tag"],
          text: `[${match[1].toUpperCase()}] ${match[2].trim()}`,
        });
      }
    }
  }

  return results;
}

// ─── Activate ─────────────────────────────────────────────────────────────────

export function activate(context: vscode.ExtensionContext) {
  const provider = new TrackitProvider();

  vscode.window.registerTreeDataProvider("trackitView", provider);

  context.subscriptions.push(
    vscode.commands.registerCommand("trackit.refresh", () => provider.refresh()),

    vscode.commands.registerCommand("trackit.openItem", (todo: TodoItem) => {
      vscode.window.showTextDocument(todo.file, {
        selection: new vscode.Range(todo.line, 0, todo.line, 0),
      });
    })
  );

  // Auto scan on startup
  provider.refresh();
}

export function deactivate() {}




// kuch tho chuda hai anyone can fix it ??The code you provided looks mostly complete and functional for a VS Code extension that scans for TODO, FIXME, and HACK comments in the workspace. However, there are a few potential issues or improvements that could be made:

// 1. **Error Handling**: The `scanWorkspace` function does not currently handle any errors that may occur while reading files or opening documents. It would be beneficial to add try-catch blocks to handle potential exceptions gracefully.

// 2. **Performance**: Scanning the entire workspace can be resource-intensive, especially for large projects. Consider adding a debounce mechanism or allowing users to specify which folders or file types to scan.

// 3. **Configuration**: Allow users to customize the tags they want to track (e.g., adding support for custom tags) and the file types to include/exclude in the scan.

// 4. **UI Feedback**: When refreshing the tree view, it might be helpful to show a loading indicator or message to inform users that the scan is in progress.

// 5. **Testing**: Ensure that you have proper testing in place for your extension, especially for edge cases like files with no tags, very large files, or files with unusual formatting.

// Overall, the code is a solid starting point for a VS Code extension that tracks TODOs, FIXMEs, and HACKs. With some additional error handling, performance optimizations, and user configuration options, it can be made even more robust and user-friendly.