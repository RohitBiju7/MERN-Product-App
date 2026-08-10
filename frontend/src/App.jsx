import React, { useState, useEffect } from "react";
import api from "./api";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductTable from "./components/ProductTable";
import AddProductForm from "./components/AddProductForm";
import EditProductModal from "./components/EditProductModal";

function App() {
  const [activeSource, setActiveSource] = useState("mongodb");
  const [viewMode, setViewMode] = useState("cards");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
  const savedMode = localStorage.getItem("darkMode");
  return savedMode === "true"; // Explicitly check for true string
});

  // Toggle dark class on <body> tag whenever darkMode state updates
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (activeSource === "mongodb") {
        response = await api.get("/products");
      } else {
        response = await api.get("https://fakestoreapi.com/products");
      }
      setProducts(response.data);
    } catch (err) {
      setError(err.message || "Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [activeSource]);

  const handleProductAdded = (newProduct) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item._id === updatedProduct._id ? updatedProduct : item,
      ),
    );
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await api.delete(`/products/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((item) => item._id !== id),
      );
    } catch (err) {
      alert(
        "Failed to delete product: " +
          (err.response?.data?.message || err.message),
      );
    }
  };

  return (
    <div>
      <Navbar
        activeSource={activeSource}
        setActiveSource={setActiveSource}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="container">
        {activeSource === "mongodb" && (
          <AddProductForm onProductAdded={handleProductAdded} />
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h2>
            {activeSource === "mongodb"
              ? "MongoDB Stored Products"
              : "Fake Store API Products"}
          </h2>
          <div>
            <button
              type="button"
              onClick={() => setViewMode("cards")}
              style={{
                marginRight: "8px",
                padding: "6px 12px",
                borderRadius: "4px",
                border: "1px solid var(--border-color)",
                backgroundColor:
                  viewMode === "cards"
                    ? "var(--border-color)"
                    : "var(--card-bg)",
                color: "var(--text-main)",
                cursor: "pointer",
              }}
            >
              Card View
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              style={{
                padding: "6px 12px",
                borderRadius: "4px",
                border: "1px solid var(--border-color)",
                backgroundColor:
                  viewMode === "table"
                    ? "var(--border-color)"
                    : "var(--card-bg)",
                color: "var(--text-main)",
                cursor: "pointer",
              }}
            >
              Table View
            </button>
          </div>
        </div>

        {loading && <p>Loading products...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {!loading &&
          !error &&
          (viewMode === "cards" ? (
            <ProductList
              products={products}
              onDelete={handleDeleteProduct}
              onEdit={(prod) => setEditingProduct(prod)}
            />
          ) : (
            <ProductTable
              products={products}
              onDelete={handleDeleteProduct}
              onEdit={(prod) => setEditingProduct(prod)}
              activeSource={activeSource}
            />
          ))}
      </main>

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onProductUpdated={handleProductUpdated}
        />
      )}
    </div>
  );
}

export default App;
