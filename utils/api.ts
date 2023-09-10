import { $Fetch, FetchOptions } from "ofetch";
import { consola } from "consola";
import NProgress from "nprogress";

export type BookId = string;
export type DocId = string;
export type Engine = "SPHINX_530";
export type Body = string;

export interface Book {
  id: BookId;
  engine: Engine;
}

export interface Doc {
  id: DocId;
  bookId: BookId;
}

export interface Job {
  job_id: string;
  job_status: "queued" | "started" | "deferred" | "finished" | "failed";
}

class ApiBase {
  private fetcher: $Fetch;

  constructor(fetcher: $Fetch) {
    this.fetcher = fetcher;
  }

  protected async send<T>(
    url: string,
    fetchOptions?: FetchOptions
  ): Promise<T> {
    const header = `${fetchOptions?.method || "GET"} ${url}`;

    try {
      consola.info(`Sending API request ${header}`);
      NProgress.start();

      // TODO: Without wrapping to useAsynData(), it is not SSR-friendly. The same request is executed twice on server and client.
      // Issue request with passed ofetch instance.
      return await this.fetcher<T>(url, fetchOptions);
    } catch (err) {
      consola.error(`API request ${header} failed`);
      // Go to Nuxt error page with message for users
      showError("It is not your fault. Our API has some troubles.");
    } finally {
      NProgress.done();
    }
  }
}

export type EnginesInfo = {
  [engine: string]: {
    name: string;
    markup: "md" | "rst" | "rst+md";
    root_doc: string;
    output: string[];
  };
};

class QueryApi extends ApiBase {
  async engines(): Promise<EnginesInfo> {
    return await this.send<EnginesInfo>("/query/engine");
  }
}

class BookApi extends ApiBase {
  /**
   * Get all existing books.
   */
  async getAll(): Promise<Book[]> {
    return await this.send<Book[]>("/book");
  }

  /**
   * Get single book.
   */
  async get(bookId: BookId): Promise<Book> {
    return await this.send<Book>(`/book/${bookId}`);
  }

  /**
   * Return all docs of the current book.
   */
  async getDocs(bookId: BookId): Promise<Doc[]> {
    return await this.send<Doc[]>(`/book/${bookId}/doc`);
  }

  /**
   * Create the book if it not exist yet.
   */
  async create(bookId: BookId, engine: Engine) {
    await this.send<Doc[]>(`/book/${bookId}`, {
      method: "POST",
      body: { engine },
    });
  }

  /**
   * Update the current book metadata.
   */
  async update(bookId: BookId, engine: Engine) {
    await this.send(`/book/${bookId}`, {
      method: "PATCH",
      body: { engine },
    });
  }
}

class DocApi extends ApiBase {
  async getBody(bookId: BookId, docId: DocId): Promise<Body> {
    // TODO: %-encode docId
    // TODO: Will ofetch follow redirect to S3?
    return await this.send<Body>(`/book/${bookId}/doc/${docId}`, {
      // TODO: Later also "blob"
      responseType: "text",
    });
  }

  async createDoc(bookId: BookId, docId: DocId, body: Body) {
    // TODO: %-encode docId
    await this.send(`book/${bookId}/doc/${docId}`, {
      method: "POST",
      body: body,
    });
  }

  async updateMetadata(bookId: BookId, docId: DocId, newId: DocId) {
    // TODO: %-encode existing docId
    await this.send(`/book/${bookId}/doc/${docId}`, {
      method: "PATCH",
      body: { id: newId },
    });
  }

  async updateBody(bookId: BookId, docId: DocId, body: Body) {
    // TODO: %-encode docId
    await this.send(`/book/${bookId}/doc/${docId}/body`, {
      method: "PATCH",
      body: body,
      headers: { "Content-Type": MIMEType.applicationOctedStream },
    });
  }

  async delete(bookId: BookId, docId: DocId) {
    // TODO: %-encode docId
    await this.send(`/book/${bookId}/doc/${docId}`, {
      method: "DELETE",
    });
  }

  async enqueuePreview(bookId: BookId, docId: DocId): Promise<Job> {
    // TODO: %-encode docId
    return await this.send<Job>(`/book/${bookId}/doc/${docId}/preview`, {
      method: "POST",
    });
  }

  async getPreviewBody(
    bookId: BookId,
    docId: DocId,
    jobId: string
  ): Promise<Body> {
    // TODO: %-encode docId
    return await this.send<Body>(
      `/book/${bookId}/doc/${docId}/preview/${jobId}`
    );
  }
}

class JobApi extends ApiBase {
  async getStatus(jobId: string): Promise<Job> {
    return await this.send<Job>(`/job/${jobId}`);
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
  // TODO: JS datetime types?
  created_at: string;
  expire_at: string | null;
}

class ShareApi extends ApiBase {
  async start(bookId: BookId, expire: ShareExpireMode): Promise<Job> {
    return await this.send(`/book/${bookId}/share`, {
      method: "POST",
      body: { expire },
    });
  }

  async query(bookId: BookId): Promise<ShareStatus> {
    return await this.send(`/book/${bookId}/share`);
  }

  async getFile(digest: string, path: string): Promise<Blob> {
    // TODO: Does ofetch follows redirects to S3 automatically?
    // TODO: %-encode path
    return await this.send(`/share/${digest}/${path}`, {
      responseType: "blob",
    });
  }
}

export class Api {
  private fetcher: $Fetch;

  public queryApi;
  public bookApi;
  public docApi;
  public jobApi;
  public shareApi;

  constructor(fetcher: $Fetch) {
    this.fetcher = fetcher;
    this.queryApi = new QueryApi(this.fetcher);
    this.bookApi = new BookApi(this.fetcher);
    this.docApi = new DocApi(this.fetcher);
    this.jobApi = new JobApi(this.fetcher);
    this.shareApi = new ShareApi(this.fetcher);
  }
}
