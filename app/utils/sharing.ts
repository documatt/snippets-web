/**
 * Calculates a CRC32 hash for the given `files` object.
 *
 * The function serializes the `files` object to a JSON string, then computes a CRC32 hash
 * using the current timestamp as a seed. Thanks to timestamp as a seed, even the same files don't produce the same hash if they are not calculated at the same time.
 *
 * @param files - The object representing files to hash.
 * @returns The CRC32 hash of the serialized files as a hexadecimal string.
 */
import crc32 from "crc-32";

export const SHARE_PREFIX = "/s/";

export function calcHash(files: Files): string {
  const data = JSON.stringify(files);
  const seed = Date.now();
  let crc = crc32.str(data, seed);
  // This converts the signed result to an unsigned 32-bit integer.
  crc = crc >>> 0;
  const crcHex = crc.toString(16);

  return crcHex;
}

export function useShareUrl(): {
  absUrl: Ref<string | undefined>;
  relUrl: Ref<string | undefined>;
} {
  const previewStore = usePreviewStore();
  const appConfig = useAppConfig();

  const absUrl = computed(() =>
    previewStore.shareHash
      ? `${appConfig.publicUrl}${SHARE_PREFIX}${previewStore.shareHash}`
      : undefined,
  );

  const relUrl = computed(() =>
    previewStore.shareHash
      ? `${SHARE_PREFIX}${previewStore.shareHash}`
      : undefined,
  );

  return { absUrl, relUrl };
}
