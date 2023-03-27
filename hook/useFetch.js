import { useEffect, useState } from "react";
import  axios  from "axios";
const rapid_api_key = process.env.RAPID_KEY_API;

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //console.log(error);
  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: { ...query },
    headers: {
      "X-RapidAPI-Key": "1ece9a68e4msh53d6ba5b9a6c82dp17ad89jsna4f07ecd4ffe",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  //axios.request(options).then(function (response) {
  //    console.log(response.data);
  //}).catch(function (error) {
  //    console.error(error);
  //});

  const fetchData = async () => {
    setLoading(false);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setError(null);
      setLoading(false);
    //  console.log(response.data.data);
    } catch (error) {
      setError(error);
      setData([]);
      alert("There is an error.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const refetch = () => {
    setLoading(true);
    fetchData();
  };
  return { data, loading, error, refetch };
};


export default useFetch;