


'use client';

import React from "react";
import { useTheme } from "next-themes";
import { useGetAllCoursesQuery } from "../../../../redux/features/course/courseApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { TableStructure } from '../../Admin/team/Table'



const AllCourses = () => {

  const { data, isLoading, error } = useGetAllCoursesQuery({});



  // table columns
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "thumbnail",
      header: "Thumbnail",
      cell: ({ row }) => (
        <Image
          src={row.original.thumbnail.url}
          alt={row.original.name}
          width={64}
          height={64}
          className="rounded object-cover"
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      accessorKey: "purchased",
      header: "Purchased",
      cell: ({ row }) => `${row.original.purchased} times`,
    },
    {
      accessorKey: "ratings",
      header: "Ratings",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <span>{row.original.ratings}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21 16.54 14.14 22 9.24 15 8.63 12 2 9 8.63 2 9.24 7.46 14.14 5.82 21z" />
          </svg>
        </div>
      ),
    },
  ];


  const handleDeleteMember = (id:string)=>{

  }


  return (
    <div className='h-full'>
      
        <TableStructure 
          data={data?.allCourses} columns={columns} 
          handleDeleteMember={handleDeleteMember} loading={isLoading}
        />
  
    </div>
  );
};

export default AllCourses;
