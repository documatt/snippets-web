/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi, describe, expect, test } from "vitest";
import { calcHash, useShareUrl } from "./sharing";

test("createPermalink()", () => {
  const originalDateNow = Date.now;
  Date.now = () => 1718000000000; // freeze time to a fixed timestamp

  expect(calcHash({ foo: "bar" })).toBe("1f6c0381");
  expect(calcHash({ foo: "bar " })).toBe("58b1a84c");
  expect(calcHash({ " foo": "bar " })).toBe("6a3bd446");

  Date.now = originalDateNow; // restore original implementation
});

describe("useShareUrl()", () => {
  test("useShareUrl returns correct URLs when shareHash is set", () => {
    const mockShareHash = "abc123";
    const mockPublicUrl = "https://example.com";
    const mockPreviewStore = { shareHash: mockShareHash };
    const mockAppConfig = { publicUrl: mockPublicUrl };

    vi.stubGlobal("usePreviewStore", () => mockPreviewStore);
    vi.stubGlobal("useAppConfig", () => mockAppConfig);
    vi.stubGlobal("computed", (fn: any) => ({ value: fn() }));

    const { absUrl, relUrl } = useShareUrl();

    expect(absUrl.value).toBe("https://example.com/s/abc123");
    expect(relUrl.value).toBe("/s/abc123");

    vi.unstubAllGlobals();
  });

  test("useShareUrl returns undefined URLs when shareHash is not set", () => {
    const mockPreviewStore = { shareHash: undefined };
    const mockAppConfig = { publicUrl: "https://example.com" };

    vi.stubGlobal("usePreviewStore", () => mockPreviewStore);
    vi.stubGlobal("useAppConfig", () => mockAppConfig);

    vi.stubGlobal("computed", (fn: any) => ({ value: fn() }));

    const { absUrl, relUrl } = useShareUrl();

    expect(absUrl.value).toBeUndefined();
    expect(relUrl.value).toBeUndefined();

    vi.unstubAllGlobals();
  });
});
