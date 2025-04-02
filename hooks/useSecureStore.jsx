import * as SecureStore from "expo-secure-store";

const useSecureStore = () => {
  const setKey = async (key, value) => {
    try {
      let jsonValue = JSON.stringify(value);
      await SecureStore.setItemAsync(key, jsonValue);
    } catch (e) {
      console.error("Error setting key:", e);
      throw e; // Rethrow the error
    }
  };

  const getKey = async (key) => {
    try {
      let result = await SecureStore.getItemAsync(key);
      return result != null ? JSON.parse(result) : null;
    } catch (e) {
      console.error("Error getting key:", e);
      throw e; // Rethrow the error
    }
  };

  const clearStore = async () => {
    try {
      await SecureStore.deleteItemAsync("dtrack-token");
    } catch (e) {
      console.error("Error clearing store:", e);
      throw e; // Rethrow the error
    }
  };

  return { setKey, getKey, clearStore };
};

export default useSecureStore;
