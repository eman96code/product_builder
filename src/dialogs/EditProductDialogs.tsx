import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/interfaces";

interface EditProductDialogProps {
  openEditDialog: boolean;
  setOpenEditDialog: (value: boolean) => void;
  selectedProduct: Product;
  setSelectedProduct: (product: Product) => void;
  selectedProductIdx: number;
  productList: Product[];
  setProductList: (products: Product[]) => void;
}

const EditProductDialog = ({
  openEditDialog,
  setOpenEditDialog,
  selectedProduct,
  setSelectedProduct,
  selectedProductIdx,
  productList,
  setProductList,
}: EditProductDialogProps) => {
  const onSaveChanges = () => {
    const updatedProductList = [...productList];
    updatedProductList[selectedProductIdx] = { ...selectedProduct };
    setProductList(updatedProductList);
    setOpenEditDialog(false);
  };
  return (
    <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <div className="gap-4 space-y-1">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              className="col-span-3"
              value={selectedProduct.title}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  title: e.target.value,
                })
              }
            />
          </div>
          <div className="gap-4 space-y-1">
            <Label htmlFor="img_url" className="text-right">
              Image URL
            </Label>
            <Input
              id="img_url"
              name="img_url"
              className="col-span-3"
              value={selectedProduct.imgURL}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  imgURL: e.target.value,
                })
              }
            />
          </div>
          <div className="gap-4 space-y-1">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              type="number"
              id="price"
              name="price"
              className="col-span-3"
            />
          </div>
          <div className="gap-4 space-y-1">
            <Label htmlFor="category" className="text-right">
              category
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Them" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Them</SelectLabel>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="gap-4 space-y-1">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={selectedProduct.description}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  description: e.target.value,
                })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSaveChanges}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
