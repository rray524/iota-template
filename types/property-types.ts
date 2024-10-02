export interface GeneralDetails {
  price: string;
  taxes: string;
  address: string;
  lot_size: string;
  directions: string;
}

export interface RoomInterior {
  rooms: number;
  rooms_plus: number;
  bedrooms: number;
  bedrooms_plus: number;
  kitchens: number;
  family_room: string;
  basement: string;
}

export interface Exterior {
  property_type: string;
  style: string;
  exterior: string;
  garage_type: string;
  drive_parking_spaces: number;
  pool: string;
}

export interface Utilities {
  fireplace_stove: string;
  heat_source: string;
  heat_type: string;
  central_air_conditioning: string;
  laundry_level: string;
  sewers: string;
  water: string;
}

export interface AtAGlance {
  type: string;
  area: string;
  municipality: string;
  neighborhood: string;
  style: string;
  lot_size: string;
  tax: string;
  beds: number;
  baths: number;
  fireplace: string;
  pool: string;
}

export interface PropertyDetails {
  _id: string;
  name: string;
  category: string;
  available_for: string;
  listing_id: string;
  property_description: string;
  image_urls: string[];
  general_details: GeneralDetails;
  room_interior: RoomInterior;
  exterior: Exterior;
  utilities: Utilities;
  at_a_glance: AtAGlance;
  street_view: string;
  map_location: string;
  latitude: string;
  longitude: string;
  pincode: string;
  country: string;
  state: string;
  city: string;
  square_feet: number;
  property_images: any[];
}
