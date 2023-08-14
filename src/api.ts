// Snippets REST API client
// https://github.com/documatt/snippets-api/blob/dev/docs/rest-api.md

import Axios from "axios";
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import NProgress from "nprogress";
import type { ToastMessageOptions } from "primevue/toast";
import type { ToastServiceMethods } from "primevue/toastservice";

// TODO: Announce API error via toast
// The problem is to obtain toast service since the following
//    import { useToast } from 'primevue/usetoast';
//    const toast = useToast();
// will complain
//    [Vue warn]: inject() can only be used inside setup() or functional components.
//    usetoast.esm.js:7 Uncaught Error: No PrimeVue Toast provided!
// Solution might be wrapping API client as renderless component or
// as functional component.
// https://vuejs.org/guide/components/slots.html#renderless-components
// https://vuejs.org/guide/extras/render-function.html#functional-components
// However, if this would be component, can it be used from Pinia actions?
// What about wrapping into composable?
// Update 1: useToast() cannot be used from composable
// Update 2: functional components are too complex (don't understand them)
// Update 3: also renderless components aren't the way - cannot be used from
//    Pinia actions.
// Update 4: Store for `toad` (from `useToad()`) is no solution too because
//    also Pinia is not available here
//
// --> The only solution how to notify in toast is from store actions. E.g.,:
//    export const useBookStore = defineStore("book", () => {
//        const toast = useToast();
//        async function createAndSetBook() {
//            const newBookId = "some-book";
//            const bookApi = new BookApi(newBookId);
//            try {
//                await bookApi.create("SPHINX_530");
//            catch (err) {
//                toast.value.add({"summary": "very bad"})
//            }
//        }
//    }
// --> Or, Maybe notify API errors via some kind of event bus?

// Create Axios instance with defaults
const axios: AxiosInstance = Axios.create({
  baseURL: "http://localhost:8000"
});

// Using Axios interceptors:
// - on success - start and stop NProgress
// - on error - stop NProgress, log, announce to an user via toast
// Stopping NProgress (`done()`) also in error handlers prevens stucking
// progress bar in the infinite loading

axios.interceptors.request.use(
  (conf) => {
    NProgress.start();
    return conf;
  },
  (err) => {
    NProgress.done();

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
    NProgress.done();

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

// async function send(config: AxiosRequestConfig) {
//   try {
//     NProgress.start();
//     return await axios(config);
//   } catch (err) {
//     console.log(
//       `Sending API request '${config.method?.toUpperCase()} ${
//         config.url
//       }' failed.`,
//       err.toJSON()
//     );
//   } finally {
//     NProgress.done();
//   }
// }

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

export type BookId = string;
export type DocId = string;
export type Engine = "SPHINX_530";
export type Body = ArrayBuffer;

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

  // TODO: něco jako bytes v Pythonu. Asi typed array
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Typed_arrays
  // https://web.dev/webgl-typed-arrays/
  async getBody(): Promise<Body> {
    // TODO: %-encode docId
    // Axios will follow redirect to S3 automatically
    return (await axios.get(`/book/${this.bookId}/doc/${this.docId}`)).data;
  }

  async createDoc(body: Body) {
    // TODO: %-encode docId
    await axios.post(`book/${this.bookId}/doc/${this.docId}`, body);
  }

  async updateMetadata(newId: DocId) {
    // TODO: %-encode existing docId
    await axios.patch(`/book/${this.bookId}/doc/${this.docId}`, {
      id: newId
    });
  }

  async updateBody(body: Body) {
    // TODO: %-encode docId
    await axios.patch(`/book/${this.bookId}/doc/${this.docId}/body`, body);
  }

  async delete() {
    // TODO: %-encode docId
    await axios.delete(`/book/${this.bookId}/doc/${this.docId}`);
  }

  async enqueuePreview(): Promise<Job> {
    // TODO: %-encode docId
    return (await axios.post(`/book/${this.bookId}/doc/${this.docId}/preview`))
      .data;
  }

  async getPreviewBody(jobId: string): Promise<Body> {
    // TODO: %-encode docId
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
  // TODO: JS datetime types?
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
    // TODO: %-encode path
    return (await axios.get(`/share/${digest}/${path}`)).data;
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

export class QueryApi {
  static async engines(): Promise<EnginesInfo> {
    return (await axios.get(`/query/engine`)).data;
  }
}

/**
 * Send unified API error message with PrimeVue Toast
 */
export function toastApiError(toast: ToastServiceMethods) {
  toast.add({
    severity: "error",
    summary: "API error",
    detail:
      "The application will not work as expected. See browser console log for details or try reload page."
  })
}
