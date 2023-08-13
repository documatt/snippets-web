// Snippets REST API client
// https://github.com/documatt/snippets-api/blob/dev/docs/rest-api.md

import Axios from "axios";
import type { AxiosInstance } from "axios";
import NProgress from "nprogress";

// Create Axios instance with defaults
const axios: AxiosInstance = Axios.create({
  baseURL: "http://localhost:8000"
});

// Using Axios interceptors:
// - on success - start and stop NProgress
// - on error - log and announce to an user via toast

axios.interceptors.request.use(
  (conf) => {
    NProgress.start();
    return conf;
  },
  (err) => {
    console.log("API request error: ", err.toJSON());
    // oznámit toastem
    throw err;
  }
);

axios.interceptors.response.use(
  (resp) => {
    NProgress.done();
    return resp;
  },
  (err) => {
    if (err.response) {
      console.log(
        "API response error: the request was made but the server responded with a non 2xx status code. Data:",
        err.response.data,
        ", status:",
        err.response.status,
        ", headers:",
        err.response.headers
      );
    } else if (err.request as XMLHttpRequest) {
      // error.request is instance of XMLHttpRequest
      console.log(
        "API response error: the request was made but no response was received."
      );
    } else {
      console.log(
        "API response error: something happened in setting up the request that triggered an error ",
        err.message,
        "'."
      );
    }
    // oznámit toastem
    throw err;
  }
);

interface Book {
  id: BookId;
  title: string;
}

interface Doc {
  id: DocId;
  bookId: BookId;
}

interface Job {
  job_id: string;
  job_status: "queued" | "started" | "deferred" | "finished" | "failed";
}

type BookId = string;
type DocId = string;
type Engine = "SPHINX_530";

export class BookApi {
  constructor(public bookId: BookId) {}

  /**
   * Get all existing books.
   */
  static async getAll(): Promise<Book[]> {
    return (await axios.get("/book")).data;
  }

  /**
   * Get single book.
   */
  async get(): Promise<Book> {
    return (await axios.get(`/book/${this.bookId}`)).data;
  }

  /**
   * Return all docs of the current book.
   */
  async getDocs(): Promise<Doc[]> {
    return (await axios.get(`/book/${this.bookId}/doc`)).data;
  }

  /**
   * Create the book if it not exist yet.
   */
  async create(engine: Engine): Promise<void> {
    await axios.post(`/book/${this.bookId}`, {
      engine
    });
  }

  /**
   * Update the current book metadata.
   */
  async update(engine: Engine): Promise<void> {
    await axios.patch(`/book/${this.bookId}`, {
      engine
    });
  }
}

export class DocApi {
  constructor(
    public bookId: BookId,
    public docId: DocId
  ) {}

  // todo: něco jako bytes v Pythonu. Asi typed array
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Typed_arrays
  // https://web.dev/webgl-typed-arrays/
  async getBody(): Promise<ArrayBuffer> {
    // todo: %-encode docId
    // Axios will follow redirect to S3 automatically
    return (await axios.get(`/book/${this.bookId}/doc/${this.docId}`)).data;
  }

  async createDoc(body: ArrayBuffer) {
    // todo: %-encode docId
    await axios.post(`book/${this.bookId}/doc/${this.docId}`, body);
  }

  async updateMetadata(newId: DocId) {
    // todo: %-encode existing docId
    await axios.patch(`/book/${this.bookId}/doc/${this.docId}`, {
      id: newId
    });
  }

  async updateBody(body: ArrayBuffer) {
    // todo: %-encode docId
    await axios.patch(`/book/${this.bookId}/doc/${this.docId}/body`, body);
  }

  async delete() {
    // todo: %-encode docId
    await axios.delete(`/book/${this.bookId}/doc/${this.docId}`);
  }

  async enqueuePreview(): Promise<Job> {
    // todo: %-encode docId
    return (await axios.post(`/book/${this.bookId}/doc/${this.docId}/preview`))
      .data;
  }

  async getPreviewBody(jobId: string): Promise<ArrayBuffer> {
    // todo: %-encode docId
    return (
      await axios.get(`/book/${this.bookId}/doc/${this.docId}/preview/${jobId}`)
    ).data;
  }
}

export class JobApi {
  static async getStatus(jobId: string): Promise<Job> {
    return (await axios.get(`/job/${jobId}`)).data;
  }
}

type ShareExpireMode =
  | "NEVER"
  | "TEN_MINUTE"
  | "ONE_HOUR"
  | "ONE_DAY"
  | "ONE_WEEK"
  | "TWO_WEEK"
  | "ONE_MONTH"
  | "SIX_MONTH"
  | "ONE_YEAR";

interface ShareStatus {
  id: string;
  // todo: JS datetime types?
  created_at: string;
  expire_at: string | null;
}

export class ShareApi {
  static async start(bookId: BookId, expire: ShareExpireMode): Promise<Job> {
    return (await axios.post(`/book/${bookId}/share`, { expire })).data;
  }

  static async query(bookId: BookId): Promise<ShareStatus> {
    return (await axios.get(`/book/${bookId}/share`)).data;
  }

  static async getFile(digest: string, path: string): Promise<ArrayBuffer> {
    // Axios follows redirects to S3 automatically
    // todo: %-encode path
    return (await axios.get(`/share/${digest}/${path}`)).data;
  }
}

type AvailEngines = {
  [engine: string]: {
    "name": string,
    "markup": "md" | "rst" | "rst+md",
    "root_doc": string,
    "output": string[]
  }
}

export class QueryApi {
  static async engines(): Promise<AvailEngines> {
    return (await axios.get(`/query/engines`)).data;
  }
}

// const docApi = new DocApi("book-id", "doc-id")
// docApi.updateMetadata("new-doc-id");
