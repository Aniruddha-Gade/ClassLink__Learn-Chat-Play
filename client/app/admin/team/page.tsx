

'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import Heading from '../../utils/Heading';
import AdminProtected from '../../hooks/adminProtected';
import DashboardHero from "../../components/Admin/DashboardHero"
import { AdminSidebar } from './../../components/Admin/sidebar/AdminSidebar';
import { TableStructure } from '../../components/resuable/Table'
import { useGetAllAdminsAndInstructorsQuery, useAddNewMemberMutation, useDeleteMemberMutation } from "../../../redux/features/user/userApi"

import LoadingCloud from '../../components/Loader/LoadingCloud'
import { SidebarProvider, SidebarTrigger, SidebarInset } from "../../components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Separator } from "../../components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "../../components/ui/breadcrumb"
import { Button } from "../../components/ui/button"
import { Checkbox } from "../../components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, } from "lucide-react"
import { IUser } from "../../../types/types"
import { formatDate } from '../../../lib/formatDate'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../../components/ui/select"
import { toast } from 'sonner'


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
  // {
  //   accessorKey: "accountType",
  //   header: ({ column }) => {
  //     return (
  //       <Button variant="ghost">
  //         Role
  //       </Button>
  //     )
  //   },
  // },
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

  const { data: allAdminInstructor, isLoading: isLoadingAllAdminsInstructor,
    error: errorAllAdminInstructor, refetch } = useGetAllAdminsAndInstructorsQuery({}, { refetchOnMountOrArgChange: true })


  const [addNewMember, { isSuccess, isLoading, data, error }] = useAddNewMemberMutation({})
  const [deleteMember, { isSuccess:deleteMemberIsSuccess, isLoading:deleteMemberIsLoading, error:deleteMemberError }] = useDeleteMemberMutation({})
  const [newMemberData, setNewMemberData] = useState({
    email: "", name: "", accountType: ""
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)


  // handle Input Change
  const handleInputChange = (e:any) => {
    const { id, value } = e.target;
    setNewMemberData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // handle Account Type Change
  const handleAccountTypeChange = (value:any) => {
    setNewMemberData((prev) => ({
      ...prev,
      accountType: value,
    }));
  };

  // validate Add New Member Form
  const validateAddNewMemberForm =  ()=>{
    if(!newMemberData){
      toast.error("Form values are not initialized.");
      return false
    } 
    else if(!newMemberData.name) {
      toast.error("Name is required");
      return false
    }
    else if(!newMemberData.email) {
      toast.error("Email is required");
      return false
    }
    else if(!newMemberData.accountType) {
      toast.error("Account Type is required");
      return false
    }
    return true
  }

  // handle Add New Member
  const handleAddNewMember = async () => {
    if(!validateAddNewMemberForm()) return;

    const { email, name, accountType } = newMemberData
    await addNewMember({ email, name, accountType })
  };


  // handle Delete Member
  const handleDeleteMember =async(id:string)=>{
await deleteMember({id})
  }

  useEffect(() => {
    if (isSuccess) {
      refetch()
      setIsDialogOpen(false)
      toast.success(`New ${newMemberData?.accountType} Added successfully`)
    }
    if(deleteMemberIsSuccess) {
      refetch()
      toast.success(`Member Deleted successfully`)
    }
    if (error) {
      if ("data" in error) {
        console.log("ADD NEW MEMBER BY ADMIN API ERROR => ", error)
        const errorData = error as any
        toast.error(errorData.data.message)
      }
    }
    if (deleteMemberError) {
      if ("data" in deleteMemberError) {
        console.log("MEMBER DELETE BY ADMIN API ERROR => ", deleteMemberError)
        const errorData = deleteMemberError as any
        toast.error(errorData.data.message)
      }
    }
  }, [isSuccess, error, refetch,deleteMemberError, deleteMemberIsSuccess,newMemberData?.accountType ])



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
                    <Link href='/admin'>
                        Admin Dashboard
                    </Link>
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

            <div className='px-5 h-full'>
              <div className='flex justify-end'>


                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
                  <DialogTrigger asChild>
                    <Button onClick={()=> setIsDialogOpen(true)}>Add New Member</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] text-black dark:text-white">
                    <DialogHeader>
                      <DialogTitle>Add New Member</DialogTitle>
                      <DialogDescription>
                        Enter name, email and select type of account. Click submit when you&apos;re done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          className="col-span-3"
                          value={newMemberData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input
                          id="email"
                          className="col-span-3"
                          value={newMemberData.email}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Select
                        </Label>
                        <Select onValueChange={handleAccountTypeChange}>
                          <SelectTrigger className="w-[280px] ">
                            <SelectValue placeholder="Account Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Instructor">Instructor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleAddNewMember} disabled={isLoading}>
                        {isLoading ? 'Saving...!' : 'Add'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>



              {/* <Table for Admins /> */}
              <p className='text-2xl text-black dark:text-white font-bold'>All Admins</p>
              <TableStructure 
              data={allAdminInstructor?.admins} columns={columns} 
              handleDeleteMember={handleDeleteMember} loading={isLoadingAllAdminsInstructor} 
              />

              {/* <Table for Instructor /> */}
              <p className='text-2xl text-black dark:text-white font-bold mt-14'>All Instructors</p>
              <TableStructure 
              data={allAdminInstructor?.instructors} columns={columns} 
              handleDeleteMember={handleDeleteMember} loading={isLoadingAllAdminsInstructor}
              />

            </div>


          </SidebarInset>
        </SidebarProvider>


      </AdminProtected>

      { 
          deleteMemberIsLoading && <LoadingCloud />
      }
    </div>
  );
};

export default Page;
