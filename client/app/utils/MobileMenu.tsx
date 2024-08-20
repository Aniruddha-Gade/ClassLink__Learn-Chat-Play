import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navItemsData } from '../constants/navbar';

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
    // open: boolean;
    // setOpen: (open: boolean) => void;
    activeItem: number;
}


const MobileMenu: FC<MobileMenuProps> = ({ activeItem }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef<HTMLButtonElement>(null);

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
            // closeOnOverlayClick={true} 
            // finalFocusRef={btnRef}
            >
                <DrawerOverlay />


                <DrawerContent style={{ background: '#181818', color: 'white', maxWidth: '75vw' }}>
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
                    </DrawerBody>
                </DrawerContent>
            </Drawer>


        </>
    );
};

export default MobileMenu;
