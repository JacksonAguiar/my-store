
const AppFetch = async (url: string, options: RequestInit = {}) => {
const token = localStorage.getItem("@app:token");

  options.headers = {
    ...options.headers,
    // "Content-Type": "application/json",
    include: "credentials",
    Authorization: `Bearer ${token}`,
  };

  const backend = process.env.REACT_APP_BACKEND_URL as string;

  const response = await fetch(backend + url, options);

  if (!response.ok) {
    throw new Error(`Fetch error: ${response.statusText}`);
  }

  return response;
};

// const AppFetchJSON = async (url: string, options: RequestInit = {}) => {
//   const response = await AppFetch(url, options);

//   return await response.json();
// };

// const BasicFetch = (arg: any, ...args: any) =>
//   fetch(arg, ...args).then((res) => res.json());

export { AppFetch };
