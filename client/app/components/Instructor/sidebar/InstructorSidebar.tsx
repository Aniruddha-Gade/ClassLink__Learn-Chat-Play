"use client";

import { FC, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import { HomeOutlinedIcon, ArrowForwardIosIcon, ArrowBackIosIcon, PeopleOutlinedIcon, ReceiptOutlinedIcon, BarChartOutlinedIcon, MapOutlinedIcon, GroupsIcon, OndemandVideoIcon, VideoCallIcon, WebIcon, QuizIcon, WysiwygIcon, ManageHistoryIcon, SettingsIcon, ExitToAppIcon, AccountCircleIcon} from "../../../../lib/Icon";
import avatarDefault from "../../../../public/assets/icons/profile-icon.png";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";



interface ItemProps {
    title: string;
    to: string;
    icon: JSX.Element;
    selected: string;
    setSelected: any;
}


const Item: FC<ItemProps> = ({ title, to, icon, selected, setSelected }) => {
    return (
        <MenuItem
            active={selected === title}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography className="!text-[16px] text-black dark:text-[#ffffffc1] !font-Poppins">{title}</Typography>
            <Link href={to} />
        </MenuItem>
    );
};



const InstructorSidebar = () => {
    const { user } = useSelector((state: any) => state.auth);

    const [logout, setLogout] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const [mounted, setMounted] = useState(false);

    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return null;
    }

    const logoutHandler = () => {
        setLogout(true)
    }



    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    backgroundColor: theme === "dark" ? "#232420" : "#fff",
                },
                "&.pro-icon-wrapper": {
                    backgroundColor: "transparent ",
                },
                "&.pro-inner-item:hover": {
                    color: "#868dfb ",
                },
                "&.pro-menu-item.active": {
                    color: "#6870fa ",
                },
                "&.pro-inner-item": {
                    padding: "5px 35px 5px 20px ",
                },
                opacity: 1,
                "&.pro-menu-item": {
                    color: `${theme !== "dark" && "#000"}`,
                },
            }}
            className="bg-white dark:bg-[#111C43] "
        >
            <ProSidebar
                collapsed={isCollapsed}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: "100vh",
                    width: isCollapsed ? '0%' : '16%'
                }}
            >
                <Menu iconShape="square">
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
                        style={{ margin: "10px 0 20px 0" }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Link href="/">
                                    <h3 className="text-[25px] font-Poppins font-semibold text-green-600">
                                        ClassLink
                                    </h3>
                                </Link>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)} className="inline-bloc">
                                    <ArrowBackIosIcon className="text-black dark:text-[#ffffffc1]" />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>


                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Image
                                    alt="profile-user"
                                    width={100}
                                    height={100}
                                    src={user?.avatar ? user.avatar.url : avatarDefault}
                                    style={{
                                        borderRadius: "50%",
                                        border: "3px solid #5b6fe6",
                                    }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h6"
                                    className="text-[15px] text-black dark:text-[#ffffffc1]"
                                    sx={{ m: "10px 0 0" }}
                                >
                                    {user?.name}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{ m: "2px 0 0" }}
                                    className="!text-[13px] text-black dark:text-[#ffffffc1] capitalize"
                                >
                                    {user?.accountType}
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to="/instructor"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Profile" 
                            to="/profile"
                            icon={<AccountCircleIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        {/* data */}
                        <Typography
                            variant="h5"
                            sx={{ m: "15px 0 5px 25px" }}
                            className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
                        >
                            {!isCollapsed && "Data"}
                        </Typography>
                        <Item
                            title="Users"
                            to="/instructor/users"
                            icon={<GroupsIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Invoices"
                            to="/instructor/invoices"
                            icon={<ReceiptOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        {/* Content */}
                        <Typography
                            variant="h5"
                            className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            {!isCollapsed && "Content"}
                        </Typography>
                        <Item
                            title="Create Course"
                            to="/instructor/create-course"
                            icon={<VideoCallIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Live Courses"
                            to="/instructor/courses"
                            icon={<OndemandVideoIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />




                        {/* Analytics */}
                        <Typography
                            variant="h6"
                            className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            {!isCollapsed && "Analytics"}
                        </Typography>
                        <Item
                            title="Courses Analytics"
                            to="/instructor/courses-analytics"
                            icon={<BarChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                             title="Users Analytics"
                             to="/instructor/users-analytics"
                             icon={<ManageHistoryIcon />}
                             selected={selected}
                             setSelected={setSelected}
                         />
                        <Item
                            title="Orders Analytics"
                            to="/instructor/orders-analytics"
                            icon={<MapOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        {/* Extras */}
                        <Typography
                            variant="h6"
                            className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            {!isCollapsed && "Extras"}
                        </Typography>
                        <Item
                            title="Settings"
                            to="/instructor/settings"
                            icon={<SettingsIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};


export default InstructorSidebar