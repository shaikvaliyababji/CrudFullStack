import axios from "axios";
import { useEffect, useState } from "react";

const API = "http://localhost:2024/products/";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [form, setForm] = useState({ name: "", price: "" });
    const [editId, setEditId] = useState(null);

    // Fetch products
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await axios.get(API);
            setProducts(res.data);
            setError("");
        } catch (err) {
            setError("Failed to fetch products");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle form input
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Add product
    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:2024/products/add", form);
            setForm({ name: "", price: "" });
            fetchProducts();
        } catch (err) {
            setError("Failed to add product");
        }
    };

    // Edit product
    const handleEdit = (product) => {
        setEditId(product._id || product.id);
        setForm({ name: product.name, price: product.price });
    };

    // Update product
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API}${editId}`, form);
            setEditId(null);
            setForm({ name: "", price: "" });
            fetchProducts();
        } catch (err) {
            setError("Failed to update product");
        }
    };

    // Delete product
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API}${id}`);
            fetchProducts();
        } catch (err) {
            setError("Failed to delete product");
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: "2rem auto", padding: 20, background: "#f9f9f9", borderRadius: 8 }}>
            <h2>Product List</h2>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <form onSubmit={editId ? handleUpdate : handleAdd} style={{ marginBottom: 20 }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={{ marginRight: 8 }}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    style={{ marginRight: 8 }}
                />
                <br />
                <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required style={{ marginRight: 8 }} />
                <button type="submit">{editId ? "Update" : "Add"} Product</button>
                {editId && (
                    <button type="button" onClick={() => { setEditId(null); setForm({ name: "", price: "" }); }} style={{ marginLeft: 8 }}>
                        Cancel
                    </button>
                )}
            </form>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#eee" }}>
                            <th style={{ padding: 8, border: "1px solid #ccc" }}>Name</th>
                            <th style={{ padding: 8, border: "1px solid #ccc" }}>Price</th>
                            <th style={{ padding: 8, border: "1px solid #ccc" }}>Description</th>
                            <th style={{ padding: 8, border: "1px solid #ccc" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr><td colSpan={3} style={{ textAlign: "center" }}>No products found.</td></tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product._id || product.id}>
                                    <td style={{ padding: 8, border: "1px solid #ccc" }}>{product.name}</td>
                                    <td style={{ padding: 8, border: "1px solid #ccc" }}>{product.price}</td>
                                    <td style={{ padding: 8, border: "1px solid #ccc" }}>{product.description}</td>
                                    <td style={{ padding: 8, border: "1px solid #ccc" }}>
                                        <button onClick={() => handleEdit(product)} style={{ marginRight: 8 }}>Edit</button>
                                        <button onClick={() => handleDelete(product._id || product.id)} style={{ color: "red" }}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductList;