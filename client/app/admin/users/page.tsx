'use client'


import React from 'react';
import Link from 'next/link'
import Heading from '../../utils/Heading';
import AdminProtected from '../../hooks/adminProtected';
import DashboardHero from "../../components/Admin/DashboardHero"
import { AdminSidebar } from './../../components/Admin/sidebar/AdminSidebar';
import { TableStructure } from '../../components/resuable/Table'

import { SidebarProvider, SidebarTrigger, SidebarInset } from "../../components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Separator } from "../../components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "../../components/ui/breadcrumb"
import { Button } from "../../components/ui/button"
import { Checkbox } from "../../components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, } from "lucide-react"
import { IUser } from "../../../types/types"
import { formatDate } from '../../../lib/formatDate'
import { useGetAllStudentsForAdminQuery } from "../../../redux/features/user/userApi"


// Table column data
const columns: ColumnDef<IUser>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={user.avatar?.url} alt={user.name} />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
      )
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "isVerified",
    header: "Is Verified",
  },
  {
    accessorKey: "courseCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course Cnt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const user = row.original;
      return user.accountType === "Instructor" ? (
        <div>{user.courses?.length}</div>
      ) : (
        <div>-</div>
      );
    },
    enableSorting: true, // Enable sorting for this column
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Join on
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{formatDate(row.getValue("createdAt"))}</div>,
  },
]




const Page =  () => {

  const { data, isLoading, } =useGetAllStudentsForAdminQuery({})

  // handle Delete Member
  const handleDeleteMember = async (id: string) => {
  }


  return (
    <div>
      <AdminProtected>
        <Heading
          title="ClassLink - Admin Dashboard Users"
          description="ClassLink is a platform for students to learn and get help from teachers"
          keywords="Programming, MERN, Redux, Machine Learning"
        />


        <SidebarProvider>
          <AdminSidebar />

          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <DashboardHero />

              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <Link href='/admin'>
                        Admin Dashboard
                      </Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Users</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>

            <div className='font-Boogaloo text-green-600 text-4xl ml-5 font-bold mt-10'>
              ALL STUDENTS
            </div>

            <div className='px-5 h-full'>
              {/* Table for students */}
              <TableStructure
                data={data?.allStudents} columns={columns}
                handleDeleteMember={handleDeleteMember} loading={isLoading}
              />
            </div>


          </SidebarInset>
        </SidebarProvider>
      </AdminProtected>
    </div>
  );
};

export default Page;
