'use client'

import React, { useState } from 'react'
import { styles } from '../../../styles/style';
import Image from 'next/image'
import { Button } from "../../ui/button"
import { toast } from 'sonner'


interface Props {
    benefits: { title: string }[],
    setBenefits: (benefits: { title: string }[]) => void,
    prerequisites: { title: string }[],
    setPrerequisites: (benefits: { title: string }[]) => void,
    active: number,
    setActive: (active: number) => void
}

const CourseData: React.FC<Props> = ({ benefits, setBenefits, prerequisites, setPrerequisites, active, setActive }) => {

    // handle Benefit Change
    // const handleBenefitChange = (index: number, value: any) => {
    //     const updatedBenefits = [...benefits];
    //     updatedBenefits[index].title = value;
    //     setBenefits(updatedBenefits);
    // }

    const handleBenefitChange = (index: number, value: string) => {
        const updatedBenefits = benefits.map((benefit, i) =>
          i === index ? { ...benefit, title: value } : benefit // Create a new object for the specific index
        );
        setBenefits(updatedBenefits); // Update the state with the new array
      };

    // handle Add Benefit
    const handleAddBenefit = () => {
        setBenefits([...benefits, { title: "" }])
    }


    // handle prerequisites Change
    const handlePrerequisitesChange = (index: number, value: string) => {
        const updatedPrerequisites = prerequisites.map((prerequisite, i) =>
          i === index ? { ...prerequisite, title: value } : prerequisite // Create a new object for the specific index
        );
        setPrerequisites(updatedPrerequisites); // Update the state with the new array
      };

    // handle Add prerequisites
    const handleAddPrerequisites = () => {
        setPrerequisites([...prerequisites, { title: "" }])
    }


    // prev Button
    const prevButton = () => {
        setActive(active - 1);
    };

    // handle Options
    const handleOptions = () => {
        if (
            benefits[benefits.length - 1]?.title !== "" &&
            prerequisites[prerequisites.length - 1]?.title !== ""
        ) {
            setActive(active + 1);
        } else {
            toast.error("Please fill the fields for go to Next")
        }
    };

    return (
        <div className="w-[80%] m-auto mt-24 flex flex-col gap-14">
            {/* benefits */}
            <div>
                <label className={`${styles.label} text-[20px]`} htmlFor="email">
                    What are the <span className='text-green-600 font-semibold'>Benefits</span> for students in this course?
                </label>
                <br />
                {benefits.map((benefit: any, index: number) => (
                    <input
                        type="text"
                        key={index}
                        name="Benefit"
                        placeholder="You will be able to build a full stack LMS Platform..."
                        required
                        className={`${styles.input} my-2`}
                        value={benefit.title}
                        onChange={(e) => handleBenefitChange(index, e.target.value)}
                    />
                ))}
                <Image
                    onClick={handleAddBenefit}
                    src='/assets/icons/add-icon.png'
                    className="cursor-pointer object-contain w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12"
                    width={30}
                    height={30}
                    alt="Add Icon"
                />
            </div>


            {/* prerequisites */}
            <div>
                <label className={`${styles.label} text-[20px]`} htmlFor="email">
                    What are the <span className='text-green-600 font-semibold'>Prerequisites</span> for students in this course?
                </label>
                <br />
                {prerequisites.map((prerequisite: any, index: number) => (
                    <input
                        type="text"
                        key={index}
                        name="Benefit"
                        placeholder="You will be able to build a full stack LMS Platform..."
                        required
                        className={`${styles.input} my-2`}
                        value={prerequisite.title}
                        onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
                    />
                ))}
                <Image
                    onClick={() => handleAddPrerequisites()}
                    src='/assets/icons/add-icon.png'
                    className="cursor-pointer object-contain w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12"
                    width={30}
                    height={30}
                    alt="Add Icon"
                />
            </div>


            {/* next btn */}
            <div className="w-full flex-between">
                <Button
                    onClick={() => prevButton()}
                    value="Next"
                    className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                >
                    Previous
                </Button>

                <Button
                    onClick={() => handleOptions()}
                    type='submit'
                    value="Next"
                    className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                >
                    Next
                </Button>
            </div>

        </div>
    );

}

export default CourseData
