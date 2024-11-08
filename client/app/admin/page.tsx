import React from 'react';
import Heading from '../utils/Heading';
import { AdminSidebar } from '../components/Admin/sidebar/AdminSidebar';
import AdminProtected from '../hooks/adminProtected';
import DashboardHero from "../components/Admin/DashboardHero"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "../components/ui/sidebar"
import { Separator } from "../components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "../components/ui/breadcrumb"



const page = () => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="ClassLink - Admin Dashboard"
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
                      <BreadcrumbLink href="#">
                        Admin Dashboard
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>


            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-slate-100/50 dark:bg-slate-800/50" />
                <div className="aspect-video rounded-xl bg-slate-100/50 dark:bg-slate-800/50" />
                <div className="aspect-video rounded-xl bg-slate-100/50 dark:bg-slate-800/50" />
              </div>
              <div className="min-h-[100vh] flex-1 rounded-xl bg-slate-100/50 md:min-h-min dark:bg-slate-800/50" />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </AdminProtected>
    </div>
  );
};

export default page;
