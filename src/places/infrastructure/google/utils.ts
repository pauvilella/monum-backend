export function fromGoogleToMonumLanguage(language: string) {
	switch (language) {
		case 'en':
			return 'en_US';
		case 'es':
			return 'es_ES';
		case 'fr':
			return 'fr_FR';
		case 'ca':
			return 'ca_ES';
		default:
			return 'en_US';
	}
}

export const includedTypes = [
	'airport',
	'train_station',
	'church',
	'aquarium',
	'art_gallery',
	'amusement_park',
	'bus_station',
	'courthouse',
	'embassy',
	'hindu_temple',
	'library',
	'local_government_office',
	'mosque',
	'movie_theater',
	'museum',
	'park',
	'stadium',
	'synagogue',
	'tourist_attraction',
	'university',
	'zoo',
];

export const excludedTypes = [
	'car_dealer',
	'car_rental',
	'car_repair',
	'car_wash',
	'electric_vehicle_charging_station',
	'gas_station',
	'parking',
	'rest_stop',
	'accounting',
	'atm',
	'bank',
	'american_restaurant',
	'bakery',
	'bar',
	'barbecue_restaurant',
	'brazilian_restaurant',
	'breakfast_restaurant',
	'brunch_restaurant',
	'cafe',
	'chinese_restaurant',
	'coffee_shop',
	'fast_food_restaurant',
	'french_restaurant',
	'greek_restaurant',
	'hamburger_restaurant',
	'ice_cream_shop',
	'indian_restaurant',
	'indonesian_restaurant',
	'italian_restaurant',
	'japanese_restaurant',
	'korean_restaurant',
	'lebanese_restaurant',
	'meal_delivery',
	'meal_takeaway',
	'mediterranean_restaurant',
	'mexican_restaurant',
	'middle_eastern_restaurant',
	'pizza_restaurant',
	'ramen_restaurant',
	'restaurant',
	'sandwich_shop',
	'seafood_restaurant',
	'spanish_restaurant',
	'steak_house',
	'sushi_restaurant',
	'thai_restaurant',
	'turkish_restaurant',
	'vegan_restaurant',
	'vegetarian_restaurant',
	'vietnamese_restaurant',
	'barber_shop',
	'beauty_salon',
	'cemetery',
	'child_care_agency',
	'consultant',
	'courier_service',
	'electrician',
	'florist',
	'funeral_home',
	'hair_care',
	'hair_salon',
	'insurance_agency',
	'laundry',
	'lawyer',
	'locksmith',
	'moving_company',
	'painter',
	'plumber',
	'real_estate_agency',
	'roofing_contractor',
	'storage',
	'tailor',
	'telecommunications_service_provider',
	'travel_agency',
	'veterinary_care',
	'auto_parts_store',
	'bicycle_store',
	'book_store',
	'cell_phone_store',
	'clothing_store',
	'convenience_store',
	'department_store',
	'discount_store',
	'electronics_store',
	'furniture_store',
	'gift_shop',
	'grocery_store',
	'hardware_store',
	'home_goods_store',
	'home_improvement_store',
	'jewelry_store',
	'liquor_store',
	'market',
	'pet_store',
	'shoe_store',
	'shopping_mall',
	'sporting_goods_store',
	'store',
	'supermarket',
	'wholesaler',
];
