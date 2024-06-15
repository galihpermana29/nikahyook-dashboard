export default function useParseVendorDetail(payload: any) {
  return JSON.stringify({
    vendor_description: payload.vendor_description,
    vendor_album: payload.vendor_album,
    instagram: payload.instagram,
    tiktok: payload.tiktok,
    facebook: payload.facebook,
    website: payload.website,
  });
}
