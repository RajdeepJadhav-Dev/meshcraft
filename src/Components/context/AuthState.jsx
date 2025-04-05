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
    triangles: "",
    thumbnailId: null,
    thumbnailPreview: '', // /thumbnail/view/<docId>
  });
  const [thumbnails, setThumbnails] = useState([]);

  const [editAssetData, setEditAssetData] = useState([]);

  // Deployed environment base URLs
  const ASSET_FUNC_BASE_URL = "/.netlify/functions";
  const THUMB_BASE_URL = "/thumbnail";

  // Local development base URLs
  //  const ASSET_FUNC_BASE_URL = "http://localhost:5000/assets";
  //  const THUMB_BASE_URL = "http://localhost:5000/thumbnail"; 


  // --- Asset Functions ---
  const getAssets = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${ASSET_FUNC_BASE_URL}/getAssets`);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Fetch assets error:", errorData.message);
        setLoading(false);
        return [];
      }
      const data = await response.json();
      setLoading(false);
      return data || [];
    } catch (error) {
      console.error("Server error while fetching assets:", error);
      setLoading(false);
      return [];
    }
  };

  const createAsset = async (newAsset) => {
    try {
      const response = await fetch(`${ASSET_FUNC_BASE_URL}/createAsset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAsset),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Create asset error:", errorData.message);
        return null;
      }
      const data = await response.json();
      return data.asset; // Return the created asset
    } catch (error) {
      console.error("Server error while creating asset:", error);
      return null;
    }
  };

  const deleteAsset = async (id) => {
    try {
      const response = await fetch(`${ASSET_FUNC_BASE_URL}/deleteAsset/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Delete asset error:", errorData.message);
        return false;
      }
      // Remove from local state after successful deletion
      setEditAssetData((prevAssets) =>
        prevAssets.filter((asset) => asset._id !== id)
      );
      return true;
    } catch (error) {
      console.error("Server error while deleting asset:", error);
      return false;
    }
  };

  const updateAsset = async (id, updatedAsset) => {
    try {
      const response = await fetch(`${ASSET_FUNC_BASE_URL}/updateAsset/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAsset),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Update asset error:", errorData.message);
        return null;
      }

      const data = await response.json();
      console.log("Asset updated successfully:", data.asset);
       // Update local state after successful update
      setEditAssetData((prevAssets) =>
        prevAssets.map((asset) =>
          asset._id === id ? { ...asset, ...data.asset } : asset // Merge updates carefully
        )
      );
      // Update single asset view if it matches
       setAssetData(prev => prev._id === id ? { ...prev, ...data.asset } : prev);
      return data.asset;
    } catch (error) {
      console.error("Server error while updating asset:", error);
      return null;
    }
  };

  // --- Thumbnail Functions ---
  const getThumbnails = async () => {
    try {
      // GET /thumbnail (handled by thumbnail.js locally, or /functions/thumbnail deployed)
      const res = await fetch(THUMB_BASE_URL);
      if (!res.ok) {
        console.error('Error fetching thumbnails:', await res.text());
        return [];
      }
      const data = await res.json();
      return data || [];
    } catch (error) {
      console.error('Error fetching thumbnails:', error);
      return [];
    }
  };

  const uploadThumbnail = async (assetId, file) => {
    try {
      const formData = new FormData();
      formData.append('assetId', assetId);
      formData.append('imageFile', file);

      // POST /thumbnail (handled by thumbnail.js locally, or /functions/thumbnail deployed)
      const res = await fetch(THUMB_BASE_URL, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const errData = await res.json();
        console.error('Error uploading thumbnail:', errData.error);
        return null;
      }
      const data = await res.json();
      console.log('Thumbnail created:', data.thumbnail);
      // Reload all data to ensure consistency after upload
      await loadAllData();
      return data.thumbnail;
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      return null;
    }
  };

  const editThumbnail = async (thumbId, file) => {
    try {
      const formData = new FormData();
      formData.append('imageFile', file);

      // PUT /thumbnail/:id (handled by thumbnail-id.js via routes locally, or /functions/thumbnail-id/:id via rewrite deployed)
      const res = await fetch(`${THUMB_BASE_URL}/${thumbId}`, {
        method: 'PUT',
        body: formData,
      });
      if (!res.ok) {
        const errData = await res.json();
        console.error('Error editing thumbnail:', errData.error);
        return null;
      }
      const data = await res.json();
      console.log('Thumbnail replaced:', data.thumbnail);
       // Reload all data to ensure consistency after edit
      await loadAllData();
      return data.thumbnail;
    } catch (error) {
      console.error('Error editing thumbnail:', error);
      return null;
    }
  };

  const deleteThumbnail = async (thumbId) => {
    try {
      // DELETE /thumbnail/:id (handled by thumbnail-id.js via routes locally, or /functions/thumbnail-id/:id via rewrite deployed)
      const res = await fetch(`${THUMB_BASE_URL}/${thumbId}`, {
        method: 'DELETE',
      });
      if (!res.ok && res.status !== 404) { // Allow 404 as "already deleted"
        console.error('Error deleting thumbnail:', await res.text());
        return false;
      }
      console.log('Thumbnail doc deleted successfully or already gone');
      // Reload all data to ensure consistency after delete
      await loadAllData();
      return true;
    } catch (error) {
      console.error('Error deleting thumbnail:', error);
      return false;
    }
  };


  // --- Data Loading and Management ---
  const loadAllData = async () => {
    setLoading(true);
    const assetsArray = await getAssets(); // Uses ASSET_FUNC_BASE_URL
    const thumbsArray = await getThumbnails(); // Uses THUMB_BASE_URL

    const merged = assetsArray.map((asset) => {
      const thumbDoc = thumbsArray.find((t) => t.assetId === asset._id);
      if (thumbDoc) {
        return {
          ...asset,
           // GET /thumbnail/view/:id (handled by thumbnail-view.js via routes locally, or /functions/thumbnail-view/:id via rewrite deployed)
          image: `${THUMB_BASE_URL}/view/${thumbDoc._id}`, // Consistent preview URL structure
          thumbnailId: thumbDoc._id,
        };
      }
      return {
        ...asset,
        image: null,
        thumbnailId: null,
      };
    });

    setEditAssetData(merged);
    setThumbnails(thumbsArray); // Keep the raw thumbnail docs available if needed
    setLoading(false);
  };

   const loadAssetById = async (assetId) => {
        setLoading(true);
        // Fetch the specific asset - assuming an endpoint like GET /assets/:id exists
        // Or alternatively, find it in the already loaded editAssetData if available
        let foundAsset = editAssetData.find(a => a._id === assetId);

        if (!foundAsset) {
            try {
                // Adjust this fetch URL based on your actual single asset endpoint
                const response = await fetch(`${ASSET_FUNC_BASE_URL}/${assetId}`); // Needs an endpoint like GET /assets/:id
                if (!response.ok) {
                     console.error(`Asset ${assetId} not found or fetch error`);
                     setLoading(false);
                     return;
                }
                foundAsset = await response.json(); // Assuming it returns the asset object directly

                // We need to merge thumbnail info again if fetched fresh
                const allThumbs = await getThumbnails();
                const thumbDoc = allThumbs.find((t) => t.assetId === assetId);
                 if (thumbDoc) {
                    foundAsset.image = `${THUMB_BASE_URL}/view/${thumbDoc._id}`;
                    foundAsset.thumbnailId = thumbDoc._id;
                } else {
                    foundAsset.image = null;
                    foundAsset.thumbnailId = null;
                }

            } catch (error) {
                console.error('Error fetching single asset:', error);
                setLoading(false);
                return;
            }
        }


        // Set the single asset state used for forms/details view
        setAssetData({
            title: foundAsset.title || "",
            description: foundAsset.description || "",
            poly: foundAsset.poly || "",
            price: foundAsset.price || "",
            modelUrl: foundAsset.modelUrl || "",
            walkModelUrls: foundAsset.walkModelUrls || [],
            software: foundAsset.software || "",
            softwareLogo: foundAsset.softwareLogo || "",
            scaleX: foundAsset.scale?.x || "", // Assuming scale is an object {x,y,z}
            scaleY: foundAsset.scale?.y || "",
            scaleZ: foundAsset.scale?.z || "",
            rotationX: foundAsset.rotation?.x || "", // Assuming rotation is {x,y,z}
            rotationY: foundAsset.rotation?.y || "",
            rotationZ: foundAsset.rotation?.z || "",
            objects: foundAsset.objects || "",
            vertices: foundAsset.vertices || "",
            edges: foundAsset.edges || "",
            faces: foundAsset.faces || "",
            triangles: foundAsset.triangles || "",
            thumbnailId: foundAsset.thumbnailId || null,
            thumbnailPreview: foundAsset.image || '', // Use the merged image URL
            _id: foundAsset._id // Keep the ID
        });
        setLoading(false);
    };


  useEffect(() => {
    loadAllData();
  }, []); 

  return (
    <authContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        open,
        setOpen,
        assetData,
        setAssetData,
        editAssetData,
        // setEditAssetData, // Avoid exposing direct setter if possible, use load methods
        thumbnails,
        // setThumbnails, // Avoid direct setter
        previewSrc,
        setPreviewSrc,
        loading,
        // Actions
        loadAllData,
        loadAssetById,
        createAsset,
        deleteAsset,
        updateAsset,
        uploadThumbnail,
        editThumbnail,
        deleteThumbnail,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;