'use client'

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useGetAllCoursesQuery } from "../../../../redux/features/course/courseApi"
import { formatDate } from '../../../../lib/formatDate'

type Props = {}

const AllCourses = (props: Props) => {
    const { theme, setTheme } = useTheme();

    const { isLoading, data, error } = useGetAllCoursesQuery({})

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "title", headerName: "Course Title", flex: 1 },
        { field: "ratings", headerName: "Ratings", flex: 0.2 },
        { field: "purchased", headerName: "Purchased", flex: 0.2 },
        { field: "created_at", headerName: "Created At", flex: 1 },
        {
            field: "   ",
            headerName: "Edit",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <Button>
                        <FiEdit2
                            className="dark:text-white text-black"
                            size={20}
                        />
                    </Button>
                );
            }
        },
        {
            field: "  ",
            headerName: "Delete",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <Button>
                        <AiOutlineDelete
                            className="dark:text-white text-black"
                            size={20}
                        />
                    </Button>
                );
            }
        }
    ];

    // table rows
    const rows: any = []

    {
        data && data?.allCourses?.forEach((item: any) => {
            rows.push({
                id: item._id,
                title: item.name,
                ratings: item.ratings,
                purchased: item.purchased,
                created_at: formatDate(item.createdAt),
            })
        })
    }


    return (
        <div className="">
            {
                isLoading ?
                    <div className='text-6xl text-green-500 text-center animate-bounce'>Loading</div>
                    :
                    <Box m="20px">
                        <Box
                            m="40px 0 0 0"
                            height="80vh"
                            sx={{
                                "& .MuiDataGrid-root": {
                                    border: "none",
                                    outline: "none",
                                },
                                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-sortIcon": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-row": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                    borderBottom:
                                        theme === "dark"
                                            ? "1px solid #ffffff30!important"
                                            : "1px solid #ccc!important",
                                },
                                "& .MuiTablePagination-root": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-cell": {
                                    borderBottom: "none",
                                },
                                "& .name-column--cell": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: theme === "dark" ? "#000" : "#fff",
                                },
                                "&.MuiDataGrid-columnHeaders": {
                                    backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                    borderBottom: "none",
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "&.MuiDataGrid-virtualScroller": {
                                    backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                                },
                                "&.MuiDataGrid-footerContainer": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                    borderTop: "none",
                                    backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                },
                                "&.MuiCheckbox-root": {
                                    color: theme === "dark" ? "#b7ebde !important" : "#000 !important",
                                },
                                "&.MuiDataGrid-toolbarContainer MuiButton-text": {
                                    color: "#fff !important",

                                },
                            }}
                        >
                            <DataGrid checkboxSelection rows={rows} columns={columns} />
                        </Box>
                    </Box>
            }
        </div>
    );

};

export default AllCourses;
