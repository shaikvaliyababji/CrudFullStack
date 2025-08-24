package com.crud.klef.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crud.klef.entity.Product;

@Repository
public interface jparepository extends JpaRepository<Product, Long>{

}
