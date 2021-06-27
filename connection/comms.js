let baseURL = "http://localhost:5000";

export function postReq(endpoint = "/testPOST", payload) {
  // return fetch(baseURL + endpoint, {
  //     method: 'post',
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'multipart/form-data'
  //         // 'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(payload)
  // }).then(function (response) {
  //     return response.json();
  // }).then(function (data) {
  //     return data;
  // });

  return { response: true };
}

export async function register(values) {
  // Add await in it
  console.log("reg" + values.password);
  return postReq("/testPOST", values);
}

export async function login(values) {
  console.log("log" + values);
  return postReq("/testPOST", values);
}
