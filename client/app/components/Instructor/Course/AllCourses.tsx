
'use client';

import React, {useEffect} from "react";
import { useGetAllCoursesQuery, useDeleteCourseMutation } from "../../../../redux/features/course/courseApi";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { TableStructure } from '../../resuable/Table'
import {toast} from "sonner"
import LoadingCloud from '../../Loader/LoadingCloud'


const AllCourses = () => {

  const { data, isLoading, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
  const [deleteCourse, { isLoading:isDeleteCourseLoading, error:deleteCourseError, isSuccess:isSuccessDeleteCourse } ]= useDeleteCourseMutation();



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
          className="rounded object-cover !w-60 "
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell:({row}) =>(
        <div>
           <p className='font-medium text-xl '>{row.original.name}</p>
           <p className="text-sm">
              {row.original.description
              .split(" ") 
              .slice(0, 40) 
              .join(" ") 
             + (row.original.description.split(" ").length > 40 ? "..." : "")} 
           </p>
        </div>
      )
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


  // handle Delete Course
  const handleDeleteCourse =async (id:string)=>{
    if(!id) {
      toast.error("Course ID is required to delete course")
      return;
    }
 
    await deleteCourse({id})
  }

  useEffect(() => {
    if (isSuccessDeleteCourse) {
        refetch()
        toast.success("Course deleted successfully")
    }
    if (deleteCourseError) {
        if ("data" in deleteCourseError) {
            console.log("DELETE COURSE API ERROR => ", deleteCourseError)
            const errorData = error as any
            toast.error(errorData.data.message)
        }
    }
}, [isSuccessDeleteCourse, deleteCourseError])



  return (
    <div className='h-full'>
      
        <TableStructure 
          data={data?.allCourses} columns={columns} 
          handleDeleteMember={handleDeleteCourse} loading={isLoading || isDeleteCourseLoading}
        />
  

        { 
          isDeleteCourseLoading && <LoadingCloud />
        }
    </div>
  );
};

export default AllCourses;
