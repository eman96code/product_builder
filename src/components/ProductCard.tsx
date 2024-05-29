import { Product } from "@/interfaces";
import ProductCardAction from "./ProductCardAction";
interface ProductProps {
  product: Product;
  openEditDialog: boolean;
  setOpenEditDialog: (value: boolean) => void;
  setSelectedProduct: (product: Product) => void;
  productIdx: number;
  setSelectedProductIdx: (idx: number) => void;
  setOpenAlertDialog: (value: boolean) => void;
}

const ProductCard = ({
  product,
  openEditDialog,
  setOpenEditDialog,
  setSelectedProduct,
  productIdx,
  setSelectedProductIdx,
  setOpenAlertDialog,
}: ProductProps) => {
  const { id, imgURL, title, description, price } = product;
  return (
    <div
      key={id}
      className="cursor-pointer space-y-1 rounded-lg border p-3 duration-200 hover:bg-lime-200 hover:text-gray-600"
    >
      <h1>{title}</h1>
      <img src={imgURL} className=" rounded-md" />
      <p className="overflow-hidden text-ellipsis whitespace-nowrap">
        {description}
      </p>
      <div>
        <span>💙</span>
        <span>💙</span>
        <span>💙</span>
      </div>
      <div className="flex items-center justify-between">
        <p>{price}</p>
        <p>category</p>
      </div>
      <ProductCardAction
        product={product}
        openEditDialog={openEditDialog}
        setOpenEditDialog={setOpenEditDialog}
        setSelectedProduct={setSelectedProduct}
        productIdx={productIdx}
        setSelectedProductIdx={setSelectedProductIdx}
        setOpenAlertDialog={setOpenAlertDialog}
      />
    </div>
  );
};

export default ProductCard;
