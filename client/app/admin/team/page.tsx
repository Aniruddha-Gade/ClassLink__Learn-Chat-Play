

'use client'

import React, {useEffect, useState} from 'react';
import Heading from '../../utils/Heading';
import AdminProtected from '../../hooks/adminProtected';
import DashboardHero from "../../components/Admin/DashboardHero"
import { AdminSidebar } from './../../components/Admin/sidebar/AdminSidebar';
import {TableStructure} from '../../components/Admin/team/Table'
import {useGetAllAdminsAndInstructorsQuery} from "../../../redux/features/user/userApi"

import { SidebarProvider, SidebarTrigger, SidebarInset } from "../../components/ui/sidebar"
import { Avatar, AvatarFallback,AvatarImage} from "../../components/ui/avatar"
import { Separator } from "../../components/ui/separator"
import {Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator,} from "../../components/ui/breadcrumb"
import {Button} from "../../components/ui/button"
import { Checkbox } from "../../components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import {IUser} from "../../../../types/types"
import {formatDate} from '../../../lib/formatDate'


export const columns: ColumnDef<IUser>[] = [
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
      accessorKey: "accountType",
      header: ({ column }) => {
          return (
              <Button variant="ghost">
                  Role
              </Button>
          )
      },
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
          Course Count
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

  // {
  //     accessorKey: "salary",
  //     header: ({ column }) => {
  //         return (
  //             <Button
  //                 variant="ghost"
  //                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //             >
  //                 Salary
  //                 <ArrowUpDown className="ml-2 h-4 w-4" />
  //             </Button>
  //         )
  //     },
  //     cell: ({ row }) => {
  //         const salary = parseFloat(row.getValue("salary"))
         
  //         const formatted = new Intl.NumberFormat("en-IN", {
  //             style: "currency",
  //             currency: "INR",
  //         }).format(salary)

  //         return <div className="text-right font-medium">{formatted}</div>
  //     },
  //     filterFn: "equals", 
  // },


]


const Page = () => {

  const  {data:allAdminInstructor, isLoading:isLoadingAllAdminsInstructor, error:errorAllAdminInstructor, }=useGetAllAdminsAndInstructorsQuery({})

  // console.log("allAdminInstructor = ", allAdminInstructor?.instructors)


  return (
    <div>
      <AdminProtected>
        <Heading
          title="ClassLink - Admin Dashboard Team"
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
                      <BreadcrumbLink href="/admin">
                        Admin Dashboard
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Team</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>

        <div className='font-Boogaloo text-green-600 text-4xl ml-5 font-bold mt-10'>
                        MANAGE TEAM
                    </div>

                    <div className='px-5'>
                      <div className='flex justify-end'>
                        <Button>
                          Add New Admin
                        </Button>
                      </div>


{/* <Table  /> */}
<p className='text-2xl text-black dark:text-white font-bold'>All Admins</p>
<TableStructure data={allAdminInstructor?.admins} columns={columns} />

<p className='text-2xl text-black dark:text-white font-bold mt-14'>All Instructors</p>
<TableStructure data={allAdminInstructor?.instructors} columns={columns} />
                    </div>


          </SidebarInset>
        </SidebarProvider>


      </AdminProtected>
    </div>
  );
};

export default Page;