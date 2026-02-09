import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";

interface FacetedFilterProps {
  title: string;
  column: any;
  options: { label: string; value: string }[];
}

export function FacetedFilter({ title, column, options }: FacetedFilterProps) {
  const selectedValues = (column?.getFilterValue() as string[]) ?? [];
  const selected = new Set(selectedValues);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ms-4 h-9 cursor-pointer justify-start gap-1 rounded-lg px-2"
        >
          <Plus className="size-4" />
          {title}
          {selected.size > 0 && (
            <span className="bg-muted ml-1 rounded px-1.5 text-xs">
              {selected.size}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={6}
        className="w-56 rounded-xl p-1"
      >
        {options.map((option) => {
          const isSelected = selected.has(option.value);

          return (
            <DropdownMenuItem
              key={option.value}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5"
              onSelect={(e) => {
                e.preventDefault(); // ⛔ don't close menu

                if (isSelected) selected.delete(option.value);
                else selected.add(option.value);

                column?.setFilterValue(
                  selected.size ? Array.from(selected) : undefined,
                );
              }}
            >
              <Checkbox checked={isSelected} />
              <span>{option.label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
