import type {
  IUpdateUserVendorInput,
  IUserVendorDetailJSON,
} from '@/shared/models/userServicesInterface';

export default function useParseVendorDetail(payload: IUpdateUserVendorInput) {
  return {
    vendor_type_id: payload.vendor_type_id,
    location: payload.location,
    json_text: JSON.stringify({
      vendor_description: payload.vendor_description,
      vendor_album: payload.vendor_album,
    } as IUserVendorDetailJSON),
  };
}
