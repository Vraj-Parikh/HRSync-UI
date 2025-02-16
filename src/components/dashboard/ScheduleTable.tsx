import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "../ui/checkbox";
import { ResponsiveDialog } from "../common/responsive-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type TInterviewStatus =
  | "Pending"
  | "Finished"
  | "No Show"
  | "Rejected"
  | "Selected";

export type TScheduleData = {
  scheduleId: string;
  startDateTime: string;
  endDateTime: string;
  hrId: string;
  interviewStatus: TInterviewStatus;
  candidateFirstName: string;
  candidateLastName: string;
  candidateEmail: string;
  candidateContactNum: string;
};

const columnHelper = createColumnHelper<TScheduleData>();

type ScheduleTableProps = {
  data: TScheduleData[];
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onOkClickDelete: () => void;
  selectedScheduleId: string;
  setSelectedScheduleId: React.Dispatch<React.SetStateAction<string>>;
  onOkClickDeleteSelected: (selectedScheduleIds: string[]) => void;
};
function ScheduleTable({
  data,
  search,
  setSearch,
  onOkClickDelete,
  setSelectedScheduleId,
  onOkClickDeleteSelected,
}: ScheduleTableProps) {
  const navigate = useNavigate();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteSelectedOpen, setIsDeleteSelectedOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
      }),
      columnHelper.group({
        header: "Schedule",
        columns: [
          columnHelper.accessor("startDateTime", {
            header: "Start Time",
            cell: ({ getValue }) => {
              const startTime: Date = new Date(getValue());
              const formattedVal = `${startTime.toLocaleDateString()} ${startTime.toLocaleTimeString()}`;
              return <p className="text-center">{formattedVal}</p>;
            },
            sortingFn: (rowA, rowB) => {
              const dateStartA = new Date(
                rowA.original.startDateTime
              ).getTime();
              const dateStartB = new Date(
                rowB.original.startDateTime
              ).getTime();
              const isEarlier =
                dateStartA > dateStartB
                  ? 1
                  : dateStartA === dateStartB
                  ? 0
                  : -1;
              return isEarlier;
            },
          }),
          columnHelper.accessor("endDateTime", {
            header: "End Time",
            cell: ({ getValue }) => {
              const endTime: Date = new Date(getValue());
              const formattedVal = `${endTime.toLocaleDateString()} ${endTime.toLocaleTimeString()}`;
              return <p className="text-center">{formattedVal}</p>;
            },
            sortingFn: (rowA, rowB) => {
              const dateEndA = new Date(rowA.original.endDateTime).getTime();
              const dateEndB = new Date(rowB.original.endDateTime).getTime();
              const isEarlier =
                dateEndA > dateEndB ? 1 : dateEndA === dateEndB ? 0 : -1;
              return isEarlier;
            },
          }),
          columnHelper.accessor("interviewStatus", {
            header: "Status",
            cell: ({ getValue }) => <p className="text-center">{getValue()}</p>,
          }),
        ],
      }),
      columnHelper.group({
        header: "Candidate Details",
        columns: [
          columnHelper.accessor(
            (row) => `${row.candidateFirstName} ${row.candidateLastName}`,
            {
              id: "candidateName",
              header: "Name",
              cell: ({ getValue }) => (
                <p className="text-center">{getValue()}</p>
              ),
            }
          ),
          columnHelper.accessor("candidateEmail", {
            header: "Email",
            cell: ({ getValue }) => (
              <p className="text-center">{getValue() || "-"}</p>
            ),
          }),
          columnHelper.accessor("candidateContactNum", {
            header: "Contact Number",
            cell: ({ getValue }) => (
              <p className="text-center">{getValue() || "-"}</p>
            ),
          }),
        ],
      }),
      columnHelper.display({
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          return (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="size-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedScheduleId(row.id);
                      navigate(`/schedule/edit/${row.id}`);
                    }}
                  >
                    <Pencil />
                    Edit Schedule
                  </DropdownMenuItem>
                  <Separator />
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedScheduleId(row.id);
                      setIsDeleteOpen(true);
                    }}
                  >
                    <Trash2 color="red" />
                    Delete Schedule
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          );
        },
      }),
    ],
    [navigate, isDeleteOpen]
  );
  const table = useReactTable({
    data,
    columns,
    // debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (originalRow) => originalRow.scheduleId,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableSortingRemoval: false,
    onPaginationChange: setPagination,
    state: {
      globalFilter: search,
      pagination: pagination,
    },
    onGlobalFilterChange: setSearch,
    initialState: {
      sorting: [
        {
          id: "startDateTime",
          desc: false,
        },
      ],
    },
  });
  const selectedRowsId = Object.keys(table.getSelectedRowModel().rowsById);
  return (
    <div className="relative">
      <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete this schedule"
        onOkClick={onOkClickDelete}
      >
        <></>
      </ResponsiveDialog>
      <ResponsiveDialog
        isOpen={isDeleteSelectedOpen}
        setIsOpen={setIsDeleteSelectedOpen}
        title="Are you absolutely sure?"
        description={`This action cannot be undone. This will permanently delete all the ${selectedRowsId.length} selected schedules`}
        onOkClick={() => onOkClickDeleteSelected(selectedRowsId)}
      >
        <></>
      </ResponsiveDialog>
      <div className="rounded-md border mb-4 border-black overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="divide-x-[1px] border-black"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    id={header.id}
                    colSpan={header.colSpan}
                    key={header.id}
                    {...{
                      className: `${
                        header.column.getCanSort() &&
                        "cursor-pointer select-none"
                      } text-center border-black`,
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    <div className="flex items-center gap-2 justify-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      <div className="flex flex-col">
                        {header.column.getCanSort() && (
                          <ChevronUp
                            className="shrink-0 size-4"
                            strokeWidth={
                              header.column.getIsSorted() === "asc" ? 4 : 2
                            }
                            color={
                              header.column.getIsSorted() === "asc"
                                ? "green"
                                : "gray"
                            }
                          />
                        )}
                        {header.column.getCanSort() && (
                          <ChevronDown
                            className="shrink-0 size-4"
                            strokeWidth={
                              header.column.getIsSorted() === "desc" ? 4 : 2
                            }
                            color={
                              header.column.getIsSorted() === "desc"
                                ? "red"
                                : "gray"
                            }
                          />
                        )}
                      </div>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowCount() ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="divide-x-[1px] border-black"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border-black">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns[1]?.header?.length}
                  className="h-24 text-center"
                >
                  No Results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Select
          value={String(pagination.pageSize)}
          onValueChange={(value) =>
            setPagination((prev) => ({ ...prev, pageSize: Number(value) }))
          }
        >
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder="Select Total Items On Page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-1">
          <p className="text-center text-base tracking-wider">
            Page <span className="font-bold">{pagination.pageIndex + 1}</span>{" "}
            of <span className="font-bold">{table.getPageCount()}</span>
          </p>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      {selectedRowsId.length > 0 && (
        <Button
          className="absolute left-0 -bottom-8 bg-red-600"
          onClick={() => setIsDeleteSelectedOpen(true)}
        >
          Delete Selected
        </Button>
      )}
    </div>
  );
}

export default ScheduleTable;
