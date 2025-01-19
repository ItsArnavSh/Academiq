import Cookies from "js-cookie";

// Get questions for a specific contest
export const getContestData = () => {
  //Get Contest id from cookies
  const pageCookie = Cookies.get("contest");

  if (pageCookie) {
    const page = JSON.parse(pageCookie);
    return page;
  }
};
