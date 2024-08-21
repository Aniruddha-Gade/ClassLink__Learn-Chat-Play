import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navItemsData } from '../constants/navbar';
import { ThemeSwitcher } from './ThemeSwitcher'
import { useTheme } from "next-themes";

import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure, DrawerFooter,
} from '@chakra-ui/react';



type MobileMenuProps = {
    activeItem: number;
}


const MobileMenu: FC<MobileMenuProps> = ({ activeItem }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef<HTMLButtonElement>(null);
    const { theme, setTheme } = useTheme();



    return (
        <>
            <button ref={btnRef} onClick={onOpen}>
                <Image
                    className="cursor-pointer"
                    src="/assets/icons/menu-icon.png"
                    width={30}
                    height={30}
                    alt="Menu Icon"
                />
            </button>

            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                closeOnOverlayClick={true}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />


                <DrawerContent
                    className='dark:bg-[#181818] bg-white max-w-[75vw]'
                >
                    <DrawerCloseButton />

                    <DrawerHeader style={{ marginTop: '20px' }}></DrawerHeader>

                    <DrawerBody className='px-5'>

                        <div className="flex flex-col gap-4">
                            {
                                navItemsData.map((item, index) => (
                                    <Link
                                        href={item.url}
                                        key={item.name}
                                        onClick={onClose}
                                        passHref
                                    >
                                        <span
                                            className={`flex items-center gap-2 font-medium text-[18px] w-full px-6 py-3 font-Poppins rounded-xl duration-200
                                    ${activeItem === index ? 'dark:bg-white/15 bg-green-600 text-white/100 dark:text-[#3ca337] text-[crimson]  '
                                                    : 'dark:text-white/80 hover:text-white text-black hover:dark:bg-white/15 hover:dark:text-white hover:bg-green-600 '} `}
                                        >
                                            <Image
                                                className="cursor-pointer"
                                                src={item.icon}
                                                width={30}
                                                height={30}
                                                alt={`${item.name} icon`}
                                            />
                                            {item.name}
                                        </span>
                                    </Link>
                                ))
                            }
                        </div>

                        <div onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className='flex items-center gap-2 font-medium text-[18px] w-full px-6 py-3 font-Poppins rounded-xl duration-100
                                    dark:text-white/80 text-black hover:dark:bg-white/15 hover:bg-green-600'
                        >
                            <ThemeSwitcher />
                            <p>Theme</p>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>


        </>
    );
};

export default MobileMenu;
