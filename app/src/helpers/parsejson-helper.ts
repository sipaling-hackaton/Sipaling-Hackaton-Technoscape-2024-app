const parseResponse = (response: string) => {
  try {
    // clean the response
    response = response.replace(/```json/g, "");
    response = response.replace(/```/g, "");
    return JSON.parse(response);
  } catch (e) {
    return response;
  }
};

export {
  parseResponse
}