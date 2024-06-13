export default function useParseVendorDetail(payload: any) {
  return JSON.stringify({
    vendor_description: payload.vendor_description,
    vendor_album: payload.vendor_album,
  });
}
