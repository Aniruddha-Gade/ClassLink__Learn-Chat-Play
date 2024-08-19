import Link from "next/link";
import { FC } from "react";

type NavItemsProps = {
    isMobile: boolean;
    activeItem: number;
}

const navItemsData = [
    {
        name: "Home",
        url: "/"
    },
    {
        name: "Courses",
        url: "/courses"
    },
    {
        name: "About",
        url: "/about"
    },
    {
        name: "FAQ",
        url: "/faq"
    },

]


const NavItems: FC<NavItemsProps> = ({ isMobile, activeItem }) => {
    return (
        <>
            <div className="hidden 800px:flex w-full ">
                {
                    navItemsData.map((item, index) => (
                        <Link
                            href={item.url}
                            key={item.name}
                            passHref
                        >
                            <span
                                className={`font-medium text-[18px] px-6 font-Poppins 
                                    ${activeItem === index ? 'dark:text-[#3ca337] text-[crimson]  ' 
                                        : 'dark:text-white text-black'} `}
                            >
                                {item.name}
                            </span>
                        </Link>
                    ))
                }
            </div>

        </>
    )
}


export default NavItems
