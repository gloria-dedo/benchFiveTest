import { ChevronDown, Menu, Home } from "lucide-react";
import DashboardSearchBar from "./SearchBar";
// import ProductNav from "./ProductNav";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation } from "react-router";
import _ from "lodash";
import { Fragment } from "react/jsx-runtime";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const { pathname } = useLocation();

  const paths = pathname.split("/").filter(Boolean);

  return (
    <header className="sticky w-full z-50  justify-between top-0 text-lg font-syne flex h-14 items-center gap-4  bg-black px-4 py-2 md:px-8 md:py-8">
      <div className="md:hidden ">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <Menu />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-black text-white border-r border-gray-800">
            <nav className="grid gap-6 text-lg font-medium mt-4 px-4">
              <Link to="/" className="flex items-center gap-2 text-lg font-semibold mb-4"><Home className="h-6 w-6" /> <span>Home</span></Link>
              <Link to="/add-product" className="text-muted-foreground hover:text-foreground">Add Product</Link>
            </nav>  
              {/* <div className="block md:hidden">
      <ProductNav />
    </div> */}
          </SheetContent>
      
        </Sheet>
      </div>
      <Breadcrumb className="hidden md:flex">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link className="text-white/80 hover:text-white" to="/">
          <Home />
         
        </Link>
      </BreadcrumbLink>
    </BreadcrumbItem>

    {paths.map((path, index) => {
      const isLast = index === paths.length - 1;
      const linkPath = "/" + paths.slice(0, index + 1).join("/");

      return (
        <Fragment key={index} >
          <BreadcrumbSeparator />
          <BreadcrumbItem >
            {isLast ? (
              <BreadcrumbPage className="text-white text-sm">{_.startCase(path)}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link to={linkPath} >{_.startCase(path)}</Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        </Fragment>
      );
    })}
  </BreadcrumbList>
</Breadcrumb>

  <DashboardSearchBar onSearch={() => {}} />




      <DropdownMenu>
        <DropdownMenuTrigger asChild className="ml-auto">
          <Button variant="ghost" className="  flex gap-x-3 items-center p-6 bg-white rounded-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="flex items-center gap-x-2">
              Super Admin <ChevronDown size={16} />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Navbar;