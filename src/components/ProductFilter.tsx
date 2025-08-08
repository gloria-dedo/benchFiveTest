import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
export default function ProductTypeFilter(){
     const [position, setPosition] = React.useState("bottom");
    return(
        <section>
        <DropdownMenu>
      <DropdownMenuTrigger asChild>

        <Button variant="outline" className="flex gap-2 text-sm  py-5 shadow-none border-black/8">Filter <SlidersHorizontal className="h-4 w-4" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter Products</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">DVD-disc</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Book</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Furniture</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>

        </section>
    )
}