import axios from "axios";

export default axios.create({
  baseURL: "https://restaurant-7df2e-default-rtdb.firebaseio.com/",
  headers: {
    key: "AIzaSyAtAI6sjYBOkruQdDKKggITnzl7aDsUKQI",
  },
});
