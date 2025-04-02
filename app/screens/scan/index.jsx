import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";

import ScannedList from "../../../components/document/ScannedList";
import StackHeader from "../../../components/ui/StackHeader";
import NoCameraPermission from "../../../components/screen/NoCameraPermission";

import useAxios from "../../../hooks/useAxios";
import useErrorHandler from "../../../hooks/useErrorHandler";
import AppButton from "../../../components/forms/AppButton";

const index = () => {
  const axios = useAxios();
  const [permissions, grantPermission] = useCameraPermissions();
  const { errorMessage, setErrorMessage } = useErrorHandler();

  if (!permissions?.granted) {
    return (
      <>
        <AppButton onPress={grantPermission}>
          <Text>Add Camera Permission</Text>
        </AppButton>
        <NoCameraPermission onGrantPermission={grantPermission} />
      </>
    );
  }

  const QRScanner = () => {
    const [scanData, setScanData] = useState();
    const [alreadyScan, setAlreadyScan] = useState(false);
    const [scannedList, setScannedList] = useState([]);
    const [successScan, setSuccessScan] = useState(false);
    const route = usePathname();
    const router = useRouter();
    const isScannerActive = route.endsWith("scanner");
    const [tempScan, setTempScan] = useState([]);
    const [startScan, setStartScan] = useState(false);

    useEffect(() => {
      if (!isScannerActive) {
        setStartScan(false);
        setScanData(null);
      }
    }, [isScannerActive]);

    const handleBarCodeScanned = (data) => {
      if (tempScan.includes(data)) {
        setAlreadyScan(true);
      } else {
        console.log(data);
        setTempScan((prev) => [...prev, data]);
        setScanData(data);
        setAlreadyScan(false);
        setSuccessScan(true);
        setStartScan(false);
      }
    };

    useEffect(() => {
      if (successScan) {
        const timer = setTimeout(() => {
          setSuccessScan(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [successScan]);

    const getRequest = axios.get({
      key: ["scan-document", scanData],
      url: "scan-document/" + scanData,
      options: {
        enabled: !!scanData,
      },
    });

    useEffect(() => {
      if (getRequest.isSuccess) {
        const exist = scannedList.some((item) =>
          item.document_copies.some((copy) => copy.copy_hashcode === scanData)
        );

        if (!exist) {
          setScannedList((prev) => [
            { ...getRequest.data, scanned_copy: scanData },
            ...prev,
          ]);
        } else {
          setAlreadyScan(true);
        }
      }

      if (getRequest.isError) {
        if (getRequest?.error?.response?.status == 404) {
          Alert.alert(
            "Invalid Document",
            "The QR code that you scanned is not a valid BRHMC document."
          );
        }

        if (getRequest?.error?.response?.status == 422) {
          setErrorMessage(getRequest?.error?.response?.data?.message);
        }
      }
    }, [getRequest.isSuccess, getRequest.isError]);

    useEffect(() => {
      if (alreadyScan) {
        const timer = setTimeout(() => {
          setAlreadyScan(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [alreadyScan]);

    return (
      <View className="flex flex-1 bg-slate-100 items-center pb-0">
        <StackHeader
          headerTitle="Scan Document"
          rightAction={
            <TouchableOpacity
              onPress={() => {
                router.push("/screens/scan/RecentlyReceived");
              }}
            >
              <MaterialIcons name="document-scanner" size={24} color="#fff" />
            </TouchableOpacity>
          }
        />
        <View className="w-[460px] h-[400px] bg-primary rounded-full absolute -mt-[220px]"></View>

        {/* Scanner */}
        <View
          className="w-[220px] h-[220px] mx-auto rounded-2xl border-4 border-white bg-white mb-1 relative  flex flex-col  overflow-hidden "
          style={{
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 3,
            position: "relative",
          }}
        >
          {getRequest.isFetching && successScan && (
            <View className="w-full h-full justify-center items-center bg-primary ">
              <FontAwesome name="check" size={80} color="white" />
              <Text className="text-white text-md text-center font-bold px-10">
                Document Succesfully Scanned
              </Text>
              <Text className="text-white text-[9px] mt-2 text-center font-bold px-8">
                Fetching Document Details...
              </Text>
            </View>
          )}

          {!startScan && (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setErrorMessage(null);
                  setStartScan(true);
                }}
                className="w-full h-full flex justify-end pb-7 items-center bg-slate-100 "
              >
                <Image
                  source={require("../../../assets/images/qr-code.png")}
                  className="w-28 h-28 mb-2"
                />
                <Text className="text-black text-lg font-bold">
                  TAP TO SCAN
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {startScan && (
            <CameraView
              barcodeScannersettings={{
                barcodeTypes: ["qr"],
              }}
              onBarcodeScanned={({ data }) => {
                handleBarCodeScanned(data);
              }}
              style={{
                flex: 1,
              }}
            />
          )}
        </View>

        <View className="w-full items-center justify-center">
          {alreadyScan && !successScan && (
            <Text className="text-red-600 w-full text-center text-xs">
              Document Already Scanned
            </Text>
          )}

          {startScan && (
            <TouchableOpacity
              onPress={() => {
                setStartScan(false);
                setAlreadyScan(false);
              }}
              className="w-[220px] bg-red-500 items-center justify-center p-1 rounded-sm mt-2"
            >
              <Text className="text-white text-xs">Stop</Text>
            </TouchableOpacity>
          )}
        </View>

        {errorMessage && (
          <View className="px-3 w-3/4 relative mx-4">
            <View className="w-full bg-red-100 rounded-lg p-2 mt-2">
              <View className="flex flex-row w-full justify-between items-center mb-2">
                <View>
                  <Text className="text-red-500 text-xs text-start font-bold">
                    Error Acquired
                  </Text>
                </View>
                <View>
                  <TouchableOpacity onPress={() => setErrorMessage(null)}>
                    <MaterialIcons name="close" size={16} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
              <Text key={index} className="text-red-500 text-xs">
                {errorMessage}
              </Text>
            </View>
          </View>
        )}

        <View className="flex-1 w-full px-4 mt-4">
          {scannedList.length > 0 && (
            <ScannedList
              scannedList={scannedList}
              onReceived={(document) => {
                setScannedList((prev) => {
                  return prev.filter(
                    (item) => item.hashcode !== document.hashcode
                  );
                });
              }}
              onDelete={(document) => {
                setScannedList((prev) => {
                  return prev.filter(
                    (item) => item.hashcode !== document.hashcode
                  );
                });
              }}
            />
          )}
        </View>
      </View>
    );
  };

  return <QRScanner />;
};

export default index;
