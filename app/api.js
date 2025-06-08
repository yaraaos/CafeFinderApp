// api.js

// Base URL for the Open Brewery DB v1 API
const API_BASE_URL = 'https://api.openbrewerydb.org/v1';

// Endpoint for listing breweries
const LIST_BREWERIES_URL = `${API_BASE_URL}/breweries`;

// Helper to build the URL for fetching a single brewery by its obdb-id
const SINGLE_BREWERY_URL = (id) => `${API_BASE_URL}/breweries/${id}`;

/**
 * Fetch a list of breweries (optionally filter by city)
 * @param {string} city
 * @returns {Promise<Array>}
 */
export async function fetchBreweries(city = '') {
  const url = city
    ? `${LIST_BREWERIES_URL}?by_city=${encodeURIComponent(city)}`
    : LIST_BREWERIES_URL;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch breweries: ${res.status}`);
  }
  return res.json();
}

/**
 * Fetch detailed info for a single brewery by its OBDB ID
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function fetchBreweryById(id) {
  const url = SINGLE_BREWERY_URL(id);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch cafe ${id}: ${res.status}`);
  }
  return res.json();
}
