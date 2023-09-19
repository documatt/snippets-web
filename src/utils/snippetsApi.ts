import { MIMEType } from './files'
import { type FetchOptions } from 'ofetch'

export type SendFn = <T>(url: string, options?: FetchOptions<'json'>) => Promise<T>

class ApiBase {
  protected send: SendFn;

  constructor(send: SendFn) {
    this.send = send
  }
}

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


export type EnginesInfo = {
  [engine: string]: {
    name: string;
    markup: "md" | "rst" | "rst+md";
    root_doc: string;
    output: string[];
  };
};

export class QueryApi extends ApiBase {
  async engines(): Promise<EnginesInfo> {
    return await this.send<EnginesInfo>("/query/engine");
  }
}

export class BookApi extends ApiBase {
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

export class DocApi extends ApiBase {
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

export class JobApi extends ApiBase {
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

export class ShareApi extends ApiBase {
  async start(bookId: BookId, expire: ShareExpireMode): Promise<Job> {
    return await this.send<Job>(`/book/${bookId}/share`, {
      method: "POST",
      body: { expire },
    });
  }

  async query(bookId: BookId): Promise<ShareStatus> {
    return await this.send<ShareStatus>(`/book/${bookId}/share`);
  }

  async getFile(digest: string, path: string): Promise<Blob> {
    // TODO: Does ofetch follows redirects to S3 automatically?
    // TODO: %-encode path
    return await this.send(`/share/${digest}/${path}`, {
      responseType: "blob",
    });
  }
}