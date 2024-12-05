import React from 'react'
import { SidebarProvider, SidebarTrigger, SidebarInset } from "../../components/ui/sidebar"
import Heading from '../../utils/Heading';
import AdminProtected from '../../hooks/adminProtected';
import DashboardHero from "../../components/Admin/DashboardHero"
import EditFaq from "../../components/Admin/customization/EditFaq"
import { AdminSidebar } from './../../components/Admin/sidebar/AdminSidebar';
import { Separator } from "../../components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "../../components/ui/breadcrumb"
import Link from 'next/link'
import axios from "axios";
import { cookies } from "next/headers";

interface Props {

}



// SSR function
async function fetchFAQs() {
    const cookieStore = await cookies(); // Access cookies
    const refreshToken = cookieStore.get("refresh_token")?.value; // Retrieve token

    if (!refreshToken) {
      throw new Error("Unauthorized: Token is missing");
    }
  
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/layout/get-layout/FAQ`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      return response.data.layout.faq;
    } catch (error:any) {
      console.error("Error fetching FAQs:", error);
      return [];
    }
  }

const page: React.FC<Props> = async() => {

    const allFAQs = await fetchFAQs()


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
                                            <BreadcrumbPage>FAQ</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                        </header>


                        <div className='font-Boogaloo text-green-600 text-4xl font-bold ml-10 mt-10'>
                            UPDATE FAQ
                        </div>
                  
                        <EditFaq allFAQs={allFAQs} />


                    </SidebarInset>
                </SidebarProvider>
            </AdminProtected>
        </div>
    )
}

export default page
