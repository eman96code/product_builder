import { Product } from "@/interfaces";
import { faker } from "@faker-js/faker";
const product_length = 15;
export const fakeProductList: Product[] = Array.from(
  { length: product_length },
  () => {
    return {
      id: faker.string.uuid(),
      imgURL: faker.image.urlPicsumPhotos(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: +faker.commerce.price({ dec: 0 }),
      category: faker.lorem.word(),
    };
  },
);
