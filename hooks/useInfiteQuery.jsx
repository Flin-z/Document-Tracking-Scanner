import React, { useEffect, useState } from "react";
import useAxios from "./useAxios";

const useInfiniteQuery = ({
  defaultPagesize,
  defaultFilter,
  defaultFilterBy,
  defaultParams,
  apiKey,
  apiLink,
  onSuccess,
}) => {
  const axios = useAxios();
  const [pageSize, setPageSize] = useState(defaultPagesize || 10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(defaultFilter || "");
  const [filterBy, setFilterBy] = useState(defaultFilterBy || "");
  const [params, setParams] = useState(defaultParams || "");
  const [totalPages] = useState(1);

  const {
    data,
    isFetching,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
    isSuccess,
  } = axios.infinite({
    key: [apiKey, currentPage, pageSize, filterBy, params],
    url:
      apiLink +
      "?" +
      (filterBy ? `filter=${filter}&filterBy=` + filterBy : params) +
      `&pageSize=${pageSize}`,
    options: {
      onSuccess: () => onSuccess(),
    },
  });

  if (data?.last_page) {
    data?.last_page != totalPages && setTotalPages(data?.last_page);
  }

  return {
    data,
    refetch,
    fetchNextPage,
    isSuccess,
    hasNextPage,
    totalPages,
    isFetching,
    isLoading,
    pageSize,
    setPageSize,
    setParams,
    currentPage,
    setCurrentPage,
    filter,
    setFilter,
    filterBy,
    setFilterBy,
  };
};

export default useInfiniteQuery;
