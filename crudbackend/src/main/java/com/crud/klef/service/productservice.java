package com.crud.klef.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crud.klef.entity.Product;
import com.crud.klef.repository.jparepository;

@Service
public class productservice {
	
	@Autowired
	private jparepository repo;
	

	
	public Product saveProduct(Product product)
	{
		return repo.save(product);
	}

	public List<Product> getproduct() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	public Long count() {
		// TODO Auto-generated method stub
		return repo.count();
	}

	  public Product getProductById(Long id) {
	        return repo.findById(id)
	                .orElseThrow(() -> new RuntimeException("Product not found with id " + id));
	    }

	   public void deleteProduct(Long id) {
	        Product product = getProductById(id);
	        repo.delete(product);
	    }

	   public Product updateProduct(Long id, String name, Double price, String description, String url)  {
	        Product product = getProductById(id);

	        product.setName(name);
	        product.setPrice(price);
	        product.setDescription(description);
            product.setUrl(url);
	        
	        return repo.save(product);
	    }

	   public Product updateProduct(Long id, Product updatedProduct) {
		// TODO Auto-generated method stub
		   Product product = repo.findById(id)
			        .orElseThrow(() -> new RuntimeException("Product not found with id " + id));

			    product.setName(updatedProduct.getName());
			    product.setPrice(updatedProduct.getPrice());
			    product.setDescription(updatedProduct.getDescription());
			    product.setUrl(updatedProduct.getUrl());

			    return repo.save(product);
	   }
}
