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
  // SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/interfaces";
import { useForm } from "react-hook-form";
import { ProductFormSchema } from "@/validations/product";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, useEffect } from "react";
import { COLORS } from "@/constants/Colors";
import ColoredCircle from "@/components/ui/coloredCircle";

interface EditProductDialogProps {
  openEditDialog: boolean;
  setOpenEditDialog: (value: boolean) => void;
  selectedProduct: Product;
  setSelectedProduct: (product: Product) => void;
  selectedProductIdx: number;
  productList: Product[];
  setProductList: (products: Product[]) => void;
  tempSelectedColors: string[];
  setTempSelectedColors: Dispatch<React.SetStateAction<string[]>>;
}

const EditProductDialog = ({
  openEditDialog,
  setOpenEditDialog,
  selectedProduct,
  // setSelectedProduct,
  selectedProductIdx,
  productList,
  setProductList,
  tempSelectedColors,
  setTempSelectedColors,
}: EditProductDialogProps) => {
  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      title: selectedProduct.title,
      imgURL: selectedProduct.imgURL || "",
      price: selectedProduct.price || 0,
      category: selectedProduct.category || "",
      description: selectedProduct.description || "",
    },
  });

  const onSaveChanges = (values: z.infer<typeof ProductFormSchema>) => {
    const updatedProductList = [...productList];
    updatedProductList[selectedProductIdx] = {
      ...selectedProduct,
      colors: tempSelectedColors,
      ...values,
    };
    setProductList(updatedProductList);
    setOpenEditDialog(false);
    setTempSelectedColors([]);
  };
  useEffect(() => {
    if (openEditDialog) {
      form.reset({
        title: selectedProduct.title,
        imgURL: selectedProduct.imgURL || "",
        price: selectedProduct.price || 0,
        category: selectedProduct.category || "",
        description: selectedProduct.description || "",
      });
    }
  }, [openEditDialog, selectedProduct, form]);

  return (
    <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSaveChanges)}>
            <div className="grid gap-2 py-4">
              <div className="gap-4 space-y-1">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="gap-4 space-y-1">
                <FormField
                  control={form.control}
                  name="imgURL"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="gap-4 space-y-1">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="gap-4 space-y-1">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified category to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="clothes">clothes</SelectItem>
                          <SelectItem value="beauty">beauty</SelectItem>
                          <SelectItem value="electronics">
                            electronics
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="gap-4 space-y-1">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <label>Selected Colors</label>
                <div className="flex flex-wrap items-center space-x-2">
                  {!setTempSelectedColors.length
                    ? "No Colors Selected"
                    : tempSelectedColors.map((color) => (
                        <span
                          key={color}
                          className="inline-block h-5 w-5 rounded-full text-xs"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <label>Available Colors</label>
                <div className="flex space-x-2 ">
                  {COLORS.map((color) => (
                    <ColoredCircle
                      key={color}
                      color={color}
                      onClick={() => {
                        if (tempSelectedColors.includes(color)) {
                          setTempSelectedColors((prev) =>
                            prev.filter((item) => item !== color),
                          );
                          return;
                        }
                        setTempSelectedColors((prev) => [...prev, color]);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Edit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
