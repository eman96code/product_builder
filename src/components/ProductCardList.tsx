import ProductCard from "./ProductCard";
import EditProductDialog from "@/dialogs/EditProductDialogs";
import { useState } from "react";
import { Product } from "@/interfaces";
import { fakeProductList } from "@/lib/fakeData";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";
import AddProductDialog from "@/dialogs/AddProductDialog";
const ProductCardList = () => {
  const { toast } = useToast();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>({
    id: "",
    imgURL: "",
    title: "",
    description: "",
    price: 0,
    category: "",
  });
  const [selectedProductIdx, setSelectedProductIdx] = useState<number>(-1);
  const [productList, setProductList] = useState<Product[]>(fakeProductList);
  const onConfirmDestroy = () => {
    const filteredProductList = productList.filter(
      (product) => product.id !== productList[selectedProductIdx]["id"],
    );
    const deletedProductTitle = productList[selectedProductIdx]["title"];
    setProductList(filteredProductList);
    setOpenAlertDialog(false);
    setSelectedProductIdx(-1);
    toast({
      title: `Product Deleted`,
      description: `Your product ${deletedProductTitle}has been deleted`,
      duration: 5000,
      variant: "destructive",
    });
  };
  return (
    <>
      <Button className="mb-5" onClick={() => setOpenAddDialog(!openAddDialog)}>
        Add Product
      </Button>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productList.map((product, idx) => (
          <ProductCard
            key={product.id}
            product={product}
            openEditDialog={openEditDialog}
            setOpenEditDialog={setOpenEditDialog}
            setSelectedProduct={setSelectedProduct}
            productIdx={idx}
            setSelectedProductIdx={setSelectedProductIdx}
            setOpenAlertDialog={setOpenAlertDialog}
          />
        ))}
      </div>
      <div>
        <AddProductDialog
          openAddDialog={openAddDialog}
          setOpenAddDialog={setOpenAddDialog}
          productList={productList}
          setProductList={setProductList}
        />
        <EditProductDialog
          openEditDialog={openEditDialog}
          setOpenEditDialog={setOpenEditDialog}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          selectedProductIdx={selectedProductIdx}
          productList={productList}
          setProductList={setProductList}
        />
        <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete
                product from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button onClick={onConfirmDestroy} variant={"destructive"}>
                Continue
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default ProductCardList;
