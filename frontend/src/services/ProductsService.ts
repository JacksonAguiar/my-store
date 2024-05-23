import { AppFetch } from "./fetcher";

class ProductService {
  apiUrl;
  constructor() {
    this.apiUrl = "/products";
  }

  async createProduct(data, imageFile) {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      for (const key in data) {
        formData.append(key, data[key]);
      }

      await AppFetch(this.apiUrl, {
        method: "POST",
        body: formData,
      });
      // return await response.json();
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  async getProducts(p: number = 1, limit: number = 10) {
    try {
      const response = await AppFetch(`${this.apiUrl}/?p=${p}&limit=${limit}`, {
        method: "GET",
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const response = await AppFetch(`${this.apiUrl}/${id}`, {
        method: "GET",
      });
      return await response.json();
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      throw error;
    }
  }

  async updateProduct(id, data, imageFile) {
    try {
      const formData = new FormData();
      if (imageFile) {
        formData.append("image", imageFile);
      }
      for (const key in data) {
        formData.append(key, data[key]);
      }

      const response = await AppFetch(`${this.apiUrl}/${id}`, {
        method: "PUT",
        body: formData,
      });
      return await response.json();
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error);
      throw error;
    }
  }
}

export default ProductService;
