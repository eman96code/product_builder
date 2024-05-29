import { Product } from "@/interfaces";
import { Button } from "./ui/button";
interface ProductCardActionProps {
  product: Product;
  openEditDialog: boolean;
  setOpenEditDialog: (value: boolean) => void;
  setSelectedProduct: (product: Product) => void;
  productIdx: number;
  setSelectedProductIdx: (idx: number) => void;
  setOpenAlertDialog: (value: boolean) => void;
}

const ProductCardAction = ({
  product,
  openEditDialog,
  setOpenEditDialog,
  setSelectedProduct,
  productIdx,
  setSelectedProductIdx,
  setOpenAlertDialog,
}: ProductCardActionProps) => {
  const onEdit = () => {
    setSelectedProduct(product);
    setOpenEditDialog(!openEditDialog);
    setSelectedProductIdx(productIdx);
  };
  const onDestroy = () => {
    setSelectedProductIdx(productIdx);
    setOpenAlertDialog(true);
  };
  return (
    <div className="buttons flex items-center justify-between gap-3">
      <Button className="flex-1" onClick={onEdit}>
        Edit
      </Button>
      <Button className="flex-1" variant={"destructive"} onClick={onDestroy}>
        Destroy
      </Button>
    </div>
  );
};

export default ProductCardAction;
