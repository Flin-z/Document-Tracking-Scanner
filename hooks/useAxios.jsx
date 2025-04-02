import { useQuery, useMutation, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAtom } from "jotai";
import { accessToken } from "../store/store";

const useAxios = () => {
  const setupHeader = (withAttachment = false) => {
    let headers = {
      "content-type": withAttachment
        ? "multipart/form-data"
        : "application/json",
    };
    const [token] = useAtom(accessToken);

    headers["Authorization"] = "Bearer " + token;

    return axios.create({
      baseURL: "http://localhost:8000/api",
      responseType: "json",
      headers: headers,
    });
  };

  // GET Request
  const get = ({ key, url, options }) => {
    const api = setupHeader();
    return useQuery({
      queryKey: key,
      queryFn: async () => {
        const res = await api.get(url);
        return res.data; // Ensure type safety for response
      },
      ...options,
      retry: 1,
      staleTime: 3000,
      refetchOnWindowFocus: false,
    });
  };

  // POST Request
  const post = ({
    key,
    url,
    onSuccess,
    onError,
    options,
    withAttachment = false,
  }) => {
    const api = setupHeader(withAttachment);
    return useMutation({
      mutationKey: key,
      mutationFn: async (data) => {
        const res = await api.post(url, data);
        return res.data; // Ensure type safety for response
      },
      onSuccess: onSuccess,
      onError: onError,
      ...options,
    });
  };

  // PUT Request
  const put = ({ key, url, onSuccess, onError, options }) => {
    const api = setupHeader();
    return useMutation({
      mutationKey: [key],
      mutationFn: async (data) => {
        const res = await api.put(url, data);
        return res.data; // Ensure type safety for response
      },
      onSuccess: onSuccess,
      onError: onError,
      ...options,
    });
  };

  // DELETE Request
  const destroy = ({ key, url, onSuccess, onError, options }) => {
    const api = setupHeader();
    return useMutation({
      mutationKey: key,
      mutationFn: async (id) => {
        const res = await api.delete(`${url}/${id}`);
        return res.data; // Ensure type safety for response
      },
      onSuccess: onSuccess,
      onError: onError,
      ...options,
    });
  };

  const rawDelete = async ({ url, id }) => {
    const api = setupHeader();
    const res = await api.delete(`${url}/${id}`);
    return res.data; // Ensure type safety for response
  };

  const rawUpdate = async ({ url, id, data }) => {
    const api = setupHeader();
    const res = await api.put(`${url}/${id}`, data);
    return res.data; // Ensure type safety for response
  };

  const infinite = ({ key, url, options = {} }) => {
    const api = setupHeader();
    return useInfiniteQuery({
      queryKey: key,
      initialPageParam: 1,
      queryFn: ({ pageParam }) =>
        api.get(url + "&page=" + pageParam).then((res) => res.data),
      ...options,
      retry: 1,
      staleTime: 30000,
      getNextPageParam: (lastPage, _, currentPage) => {
        if (lastPage.length === 0 || currentPage == lastPage.last_page) {
          return undefined;
        }
        return currentPage + 1;
      },
      getPreviousPageParam: (_, __, currentPage) => {
        if (currentPage <= 1) {
          return undefined;
        }
        return currentPage - 1;
      },
      refetchOnWindowFocus: false,
    });
  };

  return { get, post, put, destroy, rawDelete, rawUpdate, infinite };
};

export default useAxios;
