export const url = "http://localhost:3004/notes";

export const timestamp = Date.now();
  // const [isLogin, setIslogin] = useState(true);
export const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };