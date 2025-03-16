import React, { useState, useEffect } from 'react';
import authContext from './authContext';
import { set } from 'mongoose';




const AuthState = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [assetData, setAssetData] = useState({
    title: "",
    description: "",
    poly: "",
    price: "",
    modelUrl: "",
    walkModelUrls: [],
    software: "",
    softwareLogo: "",
    scaleX: "",
    scaleY: "",
    scaleZ: "",
    rotationX: "",
    rotationY: "",
    rotationZ: "",
    objects: "",
    vertices: "",
    edges: "",
    faces: "",
    triangles: ""
  });

  const [editAssetData, setEditAssetData] = useState([]);

  const BASE_URL = "/.netlify/functions";
      // const BASE_URL = "http://localhost:5000/assets";

  const getAssets = async () => {
    try {
      const response = await fetch(`${BASE_URL}/getAssets`);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Fetch assets error:", errorData.message);
        return;
      }
      const data = await response.json();
      setEditAssetData(data);
    } catch (error) {
      console.error("Server error while fetching assets:", error);
    }
    setLoading(false);
  };

  // Create asset
  const createAsset = async (newAsset) => {
    try {
      const response = await fetch(`${BASE_URL}/createAsset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAsset),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Create asset error:", errorData.message);
        return;
      }
      const data = await response.json();
      setEditAssetData((prevAssets) => [...prevAssets, data]);
    } catch (error) {
      console.error("Server error while creating asset:", error);
    }
  };

  // Delete asset
  const deleteAsset = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/deleteAsset/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Delete asset error:", errorData.message);
        return;
      }
      const data = await response.json();
      setEditAssetData((prevAssets) =>
        prevAssets.filter((asset) => asset._id !== id)
      );
    } catch (error) {
      console.error("Server error while deleting asset:", error);
    }
  };

  const updateAsset = async (id, updatedAsset) => {
    try {
      const response = await fetch(`${BASE_URL}/updateAsset/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAsset),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Update asset error:", errorData.message);
        return;
      }

      const data = await response.json();
      console.log("Asset updated successfully:", data.asset);

      setEditAssetData((prevAssets) =>
        prevAssets.map((asset) =>
          asset._id === id ? data.asset : asset
        )
      );
    } catch (error) {
      console.error("Server error while updating asset:", error);
    }
  };

  // Fetch assets on mount
  useEffect(() => {
    getAssets();
  }, []);

  return (
    <authContext.Provider
      value={{
        // States
        isSidebarOpen,
        setIsSidebarOpen,
        open,
        setOpen,
        assetData,
        setAssetData,
        editAssetData,
        setEditAssetData,

        previewSrc,
        setPreviewSrc,

        createAsset,
        getAssets,
        deleteAsset,
        updateAsset,
        loading,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;