import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    const savedProduct = this.productRepository.save(product);
    return savedProduct;
  }

  findAll() {
    return this.productRepository.find({
      loadEagerRelations: true,
      relations: {
        provider: true,
      },
    });
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: {
        productId: id,
      },
    });

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  async findByProvider(id: string) {
    const productFound = await this.productRepository.find({
      where: {
        provider: {
          providerId: id,
        },
      },
    });

    if (productFound.length === 0) {
      throw new NotFoundException();
    }

    return productFound;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productId: id,
      ...updateProductDto,
    });

    if (!productToUpdate) {
      throw new NotFoundException();
    }

    return this.productRepository.save(productToUpdate);
  }

  remove(id: string) {
    return this.productRepository.delete({
      productId: id,
    });
  }
}