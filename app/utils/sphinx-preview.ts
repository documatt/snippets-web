import {
  loadPyodide,
  version as pyodideVersion,
  type PyodideAPI,
} from "pyodide";
import whlUrl from "./assets/sphinx_preview-0.1.0-py3-none-any.whl?url";

export interface ISphinxPreview {
  SphinxPreview: (
    srcdir: string,
    confdir: string,
    outdir: string,
    confoverrides: Record<string, any>,
    verbosity: 0 | 1 | 2,
  ) => {
    build: () => { status: string; warnings: string };
  };
}

/** Object with filename as key and its rendered HTML as value */
interface HtmlFiles {
  [filename: string]: string;
}

export interface PreviewResult {
  htmlFiles: HtmlFiles;
  status: string;
  warnings: string;
}

/**
 * Known syntaxes. The value is a file extension.
 */
export enum Syntax {
  RST = "rst",
  MD = "md",
}

export function getRootFilename(syntax: Syntax) {
  return "index." + syntax;
}

// Get the last part, e.g., "sphinx_preview-0.1.0-py3-none-any.whl"
const whl_filename = whlUrl.split("/").pop()!;

export async function bootSphinxPreview() {
  const start = performance.now();
  console.debug("bootPyodide() started");

  // Load Pyodide
  const pyodide = await loadPyodide({
    indexURL: `https://cdn.jsdelivr.net/pyodide/v${pyodideVersion}/full/`,
  });

  // Download wheel and copy it to Emscripten FS
  const resp = await fetch(whlUrl);
  const data = new Uint8Array(await resp.arrayBuffer());
  pyodide.FS.writeFile(whl_filename, data);

  // Install and import SphinxPreview using micropip
  await pyodide.loadPackage("micropip");
  const micropip = pyodide.pyimport("micropip");
  await micropip.install("emfs:" + whl_filename);
  const sphinxpreview: ISphinxPreview = pyodide.pyimport("sphinx_preview");

  console.debug(
    `bootPyodide() completed in ${formatElapsedTime(performance.now() - start)}`,
  );

  return { pyodide, sphinxpreview };
}

export class SphinxPreviewRunner {
  private static readonly SRCDIR = "/srcdir/";
  private static readonly CONFDIR = "/srcdir/";
  private static readonly OUTDIR = "/outdir/";

  private pyodide: PyodideAPI;
  private sphinxpreview: ISphinxPreview;
  private files: Files;
  private syntax: Syntax;

  constructor(
    pyodide: PyodideAPI,
    sphinxpreview: ISphinxPreview,
    files: Files,
    syntax: Syntax,
  ) {
    this.pyodide = pyodide;
    this.sphinxpreview = sphinxpreview;
    this.files = files;
    this.syntax = syntax;
    console.debug("SphinxPreviewRunner initialized");
  }

  private recreateDirs() {
    const dirs = [
      SphinxPreviewRunner.SRCDIR,
      SphinxPreviewRunner.CONFDIR,
      SphinxPreviewRunner.OUTDIR,
    ];
    for (const path of dirs) {
      this.pyodide.runPython(
        `import shutil; shutil.rmtree("${path}", ignore_errors=True)`,
      );
      this.pyodide.FS.mkdirTree(path);
    }
  }

  private writeFiles() {
    for (const filename in this.files) {
      const path = SphinxPreviewRunner.SRCDIR + filename;
      const body = this.files[filename];
      this.pyodide.FS.writeFile(path, body);
    }
  }

  private runBuild() {
    const instance = this.sphinxpreview.SphinxPreview(
      SphinxPreviewRunner.SRCDIR,
      SphinxPreviewRunner.CONFDIR,
      SphinxPreviewRunner.OUTDIR,
      // confoverrides
      {
        suppress_warnings: [
          "app.add_node",
          "app.add_directive",
          "app.add_role",
        ],
      },
      // verbosity
      0,
    );
    return instance.build();
  }

  private readSingleHtmlFile(path: string): string {
    // @ts-expect-error "method readFile() doesn't exist" but it definitively exists
    return this.pyodide.FS.readFile(SphinxPreviewRunner.OUTDIR + path, {
      encoding: "utf8",
    });
  }

  private readAllHtmlFiles(): HtmlFiles {
    const htmlFiles: HtmlFiles = {};

    // Read .html for corresponding .rst/.md
    for (const docFilename in this.files) {
      if (docFilename === "conf.py") continue;

      const htmlFilename = docFilename.replace("." + this.syntax, ".html");
      const html = this.readSingleHtmlFile(htmlFilename);
      htmlFiles[docFilename] = html;
    }

    return htmlFiles;
  }

  public async run(): Promise<PreviewResult> {
    const start = performance.now();
    this.recreateDirs();
    this.writeFiles();
    const { status, warnings } = this.runBuild();
    const htmlFiles = this.readAllHtmlFiles();

    console.debug(
      `SphinxPreviewRunner completed in ${formatElapsedTime(performance.now() - start)}`,
    );

    return {
      htmlFiles,
      status,
      warnings,
    };
  }
}
