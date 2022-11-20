import axios from "axios";

export async function postData(url = '', data = {}) {
   return axios.post(url,data)
}
