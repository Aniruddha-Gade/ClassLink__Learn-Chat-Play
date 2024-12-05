import React from 'react'
import { SidebarProvider, SidebarTrigger, SidebarInset } from "../../components/ui/sidebar"
import Heading from '../../utils/Heading';
import AdminProtected from '../../hooks/adminProtected';
import DashboardHero from "../../components/Admin/DashboardHero"
import EditCategories from "../../components/Admin/customization/EditCategories"
import { AdminSidebar } from './../../components/Admin/sidebar/AdminSidebar';
import { Separator } from "../../components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "../../components/ui/breadcrumb"
import Link from 'next/link'
import axios from "axios";
import { cookies } from "next/headers";

interface Props {

}



// SSR function
async function fetchCategories() {
    const cookieStore = await cookies(); // Access cookies
    const refreshToken = cookieStore.get("refresh_token")?.value; // Retrieve token

    if (!refreshToken) {
      throw new Error("Unauthorized: Token is missing");
    }
  
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/layout/get-layout/Categories`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      return response.data.layout.categories;
    } catch (error:any) {
      console.error("Error fetching Categories:", error);
      return [];
    }
  }

const page: React.FC<Props> = async() => {

    const allCategories = await fetchCategories()


    return (
        <div>
            <AdminProtected>
                <Heading
                    title="ClassLink - Admin Dashboard - FAQ"
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
                                            <BreadcrumbPage>Categories</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                        </header>


                        <div className='font-Boogaloo text-green-600 text-4xl font-bold ml-10 mt-10'>
                            UPDATE CATEGORIES
                        </div>
                  
                        <EditCategories allCategories={allCategories} />


                    </SidebarInset>
                </SidebarProvider>
            </AdminProtected>
        </div>
    )
}

export default page
