// api.js
const API_URL = 'http://localhost:3001'; // Update with your backend URL

export const fetchData = async () => {
  const response = await fetch(`${API_URL}/data`);
  return await response.json();
}

//

export const addData = async (data) => {
  const response = await fetch(`${API_URL}/data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

