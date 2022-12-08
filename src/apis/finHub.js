import axios from "axios";

const TOKEN = "ce6ugdiad3i40nag70l0ce6ugdiad3i40nag70lg";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN,
  },
});
