// src/services/api.ts
import API_ENDPOINTS from "@src/apiConfig"; // Using the path mapping

export const fetchApplications = async () => {
  const response = await fetch(API_ENDPOINTS.applications);
  return response.json();
};

export const fetchResources = async () => {
  const response = await fetch(API_ENDPOINTS.resources);
  return response.json();
};
