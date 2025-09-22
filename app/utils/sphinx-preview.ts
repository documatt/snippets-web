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

export interface PreviewResult {
  html: string;
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

export async function runSphinxPreview(
  pyodide: PyodideAPI,
  sphinxpreview: ISphinxPreview,
  files: Files,
): Promise<PreviewResult> {
  const start = performance.now();
  console.debug("runPreview()");

  // Must end with /
  const srcdir = "/srcdir/";
  const confdir = srcdir;
  const outdir = "/outdir/";

  // (Re-)create Sphinx project's folders and files
  const dirs = [srcdir, confdir, outdir];
  for (const path of dirs) {
    pyodide.runPython(
      `import shutil; shutil.rmtree("${path}", ignore_errors=True)`,
    );
    pyodide.FS.mkdirTree(path);
  }

  for (const filename in files) {
    const path = srcdir + filename;
    const body = files[filename];
    pyodide.FS.writeFile(path, body);
  }

  const confoverrides = {
    // On second run in Pyodide only, the nodes, directives and roles are registereted multiple times and Sphinx throws zillions of warnings like
    // WARNING: while setting up extension sphinx.addnodes: node class 'toctree' is already registered, its visitors will be overridden [app.add_node]
    // WARNING: while setting up extension sphinx.addnodes: node class 'desc' is already registered, its visitors will be overridden [app.add_node]
    // WARNING: while setting up extension sphinx.addnodes: node class 'desc_signature' is already registered, its visitors will be overridden [app.add_node]
    suppress_warnings: ["app.add_node", "app.add_directive", "app.add_role"],
  };
  const verbosity = 0;

  // Run and read
  const instance = sphinxpreview.SphinxPreview(
    srcdir,
    confdir,
    outdir,
    confoverrides,
    verbosity,
  );
  const { status, warnings } = instance.build();
  // @ts-expect-error "method readFile() doesn't exist" but it definitively exists
  const html = pyodide.FS.readFile(outdir + "index.html", { encoding: "utf8" });

  console.debug(
    `runPreview() completed in ${formatElapsedTime(performance.now() - start)}`,
  );

  return {
    html,
    status,
    warnings,
  };
}
