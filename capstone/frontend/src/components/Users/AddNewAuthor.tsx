import { addUsers } from "../../slice/UsersSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectAllUsers } from "../../slice/UsersSlice";
import type { AppDispatch } from "../../store/store";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const AddNewAuthor = () => {
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch<AppDispatch>();
  const [fname, setFname] = useState("");

  const addUserNew = () => {
    const newUserId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    const newUser = {
      id: newUserId,
      name:
          (document.querySelector(
            'input[placeholder="Full Name"]'
          ) as HTMLInputElement).value,
      username:
        (
          document.querySelector(
            'input[placeholder="Username"]'
          ) as HTMLInputElement
        )?.value || "New Author ",
      email:
        (
          document.querySelector(
            'input[placeholder="Author Email"]'
          ) as HTMLInputElement
        )?.value || "sdfecger@ac.com ",
      phone:
        (
          document.querySelector(
            'input[placeholder="Author Phone"]'
          ) as HTMLInputElement
        )?.value || "+466-456-3554 ",
      company: {
        name:
          (
            document.querySelector(
              'input[placeholder="Company Name"]'
            ) as HTMLInputElement
          )?.value || "ABC Pvt Ltd ",
      },
      website:
        (
          document.querySelector(
            'input[placeholder="Author Website"]'
          ) as HTMLInputElement
        )?.value || "aeccwe.ac.in ",
      address:
        (
          document.querySelector(
            'input[placeholder="Address"]'
          ) as HTMLInputElement
        )?.value || "123, Main Street, City, Country",
    };
    console.log("newUser", newUser);
    if(fname) setFname(""); 
    dispatch(addUsers(newUser)).unwrap();
    toast("Author added successfully!");
  };
  return (
    <>
      <form onSubmit={addUserNew}>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-400 hover:bg-blue-400 text-white text-md rounded p-3 mt-3">
              Add New Author
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Author Details</DialogTitle>
              <DialogDescription>
                <Label htmlFor="fname">Full Name*</Label>
                <Input
                  type="text"
                  placeholder="Full Name"
                  className="mb-4 mt-2"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  required
                />
                <Label htmlFor="uname">User Name</Label>
                <Input type="text" placeholder="Username" className="mb-4" />
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="Author Email"
                  className="mb-4"
                />
                <Label htmlFor="phone">Phone</Label>
                <Input
                  type="text"
                  placeholder="Author Phone"
                  className="mb-4"
                />
                <Label htmlFor="company">Company</Label>
                <Input
                  type="text"
                  placeholder="Company Name"
                  className="mb-4"
                />
                <Label htmlFor="website">Website</Label>
                <Input
                  type="text"
                  placeholder="Author Website"
                  className="mb-4"
                />
                <Label htmlFor="Address">Address</Label>
                <Input type="text" placeholder="Address" className="mb-4" />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
              <Button
                className="bg-blue-400 hover:bg-blue-400 text-white text-md rounded p-3 mt-3"
                onClick={addUserNew}
                disabled={!fname}
              >
                Add Author
              </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </>
  );
};

export default AddNewAuthor;
