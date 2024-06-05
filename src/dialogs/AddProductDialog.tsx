import { v4 as uuid } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/interfaces";
import { COLORS } from "@/constants/Colors";
import ColoredCircle from "@/components/ui/coloredCircle";
import { Dispatch, useEffect } from "react";
import { ProductFormSchema } from "@/validations/product";

interface AddProductDialogProps {
  openAddDialog: boolean;
  setOpenAddDialog: (value: boolean) => void;
  productList: Product[];
  setProductList: (products: Product[]) => void;
  tempSelectedColors: string[];
  setTempSelectedColors: Dispatch<React.SetStateAction<string[]>>;
}

const AddProductDialog = ({
  openAddDialog,
  setOpenAddDialog,
  productList,
  setProductList,
  tempSelectedColors,
  setTempSelectedColors,
}: AddProductDialogProps) => {
  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      title: "",
      imgURL: "",
      price: 0,
      category: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ProductFormSchema>) => {
    setProductList([
      { id: uuid(), colors: tempSelectedColors, ...values },
      ...productList,
    ]);
    setOpenAddDialog(false);
    setTempSelectedColors([]);
  };
  useEffect(() => {
    if (openAddDialog) {
      form.reset({
        title: "",
        imgURL: "",
        price: 0,
        category: "",
        description: "",
      });
    }
  }, [openAddDialog, form]);
  return (
    <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add A New Product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
              <Button>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
