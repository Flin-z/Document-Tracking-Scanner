import { PermissionsAndroid } from "react-native";
import React, { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import ServiceUnavailable from "../components/screen/ServiceUnavailable";

const NetworkProvider = ({ children }) => {
  const [connection, setConnection] = useState({
    type: null,
    ssid: null,
  });
  const [status, setStatus] = useState();

  const checkPermission = async () => {
    let result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    return result === PermissionsAndroid.RESULTS.GRANTED;
  };

  const requestPermission = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Request user Location",
        message: "Grant location access for local network status verification.",
        buttonPositive: "Allow",
        buttonNegative: "Deny",
      }
    );
  };

  useEffect(() => {
    // Check if Location is granted
    const connection = setTimeout(() => {
      if (!checkPermission()) {
        requestPermission();
      } else {
        NetInfo.addEventListener((state) => {
          setConnection({
            isConnected: state.isConnected,
            type: state.type,
            ssid: state.details.ssid,
          });
        });
      }
    }, 100);

    return () => clearTimeout(connection);
  }, []);

  useEffect(() => {
    const check = setTimeout(() => {
      if (connection.isConnected === true && connection.type === "wifi") {
        setStatus(true);
      } else {
        setStatus(false);
      }
    }, 200);
    return () => clearTimeout(check);
  }, [connection]);

  if (status == false) {
    return <ServiceUnavailable />;
  }

  if (status === true) {
    return children;
  }

  return;
};

export default NetworkProvider;
