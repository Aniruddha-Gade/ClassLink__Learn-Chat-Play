'use client';

import React, { useState, useEffect } from 'react';
import CourseInformation from './CourseInformation';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import CoursePreview from './CoursePreview';
import { useCreateCourseMutation, useEditCourseMutation } from '../../../../redux/features/course/courseApi';
import { useGetHeroDataQuery } from '../../../../redux/features/layout/layoutApi';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { ICourse } from "../../../../types/types"

interface Props {
  course?: ICourse; // Optional course prop for editing,
  isEdit?: boolean;
}


const CreateCourse: React.FC<Props> = ({ course, isEdit }) => {

  const {data:allCategories,  } = useGetHeroDataQuery("Categories")

  const [createCourse, { isLoading: isLoadingCreateCourse, error: errorCreateCourse, isSuccess: isSuccessCreateCourse }] = useCreateCourseMutation();

  const [editCourse, { isSuccess: isSuccessEditCourse, isLoading: isLoadingEditCourse, error: errorEditCourse }] = useEditCourseMutation()
  const [active, setActive] = useState(0);

  // If course prop is provided (edit mode), populate the state with its data; otherwise, use defaults
  const [courseInfo, setCourseInfo] = useState({
    name: course?.name || '',
    description: course?.description || '',
    category: course?.category || '',
    price: course?.price || '',
    estimatedPrice: course?.estimatedPrice || '',
    tags: course?.tags || '',
    level: course?.level || '',
    demoUrl: course?.demoUrl || '',
    thumbnail: course?.thumbnail || '',
  });

  const [benefits, setBenefits] = useState(course?.benefits || [{ title: '' }]);
  const [prerequisites, setPrerequisites] = useState(course?.prerequisites || [{ title: '' }]);
  const [courseContentData, setCourseContentData] = useState(
    course?.courseData || [
      {
        videoUrl: '',
        title: '',
        description: '',
        videoSection: 'Untitled Section',
        videoLength: "",
        links: [{ title: '', url: '' }],
        suggestion: '',
      },
    ]
  );

  const [courseData, setCourseData] = useState({});

  // Handle Submit course data
  const handleSubmit = async () => {
    const formatedBenefits = benefits.map((benefit: any) => ({ title: benefit.title }));
    const formatedPrerequisites = prerequisites.map((prerequisite: any) => ({ title: prerequisite.title }));
    const formatedCourseContentData = courseContentData.map((courseContent: any) => ({
      videoUrl: courseContent.videoUrl,
      title: courseContent.title,
      description: courseContent.description,
      videoLength: courseContent.videoLength,
      videoSection: courseContent.videoSection,
      links: courseContent.links.map((link: any) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: courseContent.suggestion,
    }));



    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      category: courseInfo.category,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      thumbnail: courseInfo.thumbnail,
      totalVideos: courseContentData.length,
      benefits: formatedBenefits,
      prerequisites: formatedPrerequisites,
      courseData: formatedCourseContentData,
    };

    setCourseData(data);
  };

  const handleCreateCourse = async () => {
    const data = courseData;
    const id = course?._id
    if (isEdit) {
      if (!isLoadingEditCourse) {
        await editCourse({ id, data })
        return
      }
    }
    if (!isLoadingCreateCourse) {
      await createCourse({ data });
    }
  };

  useEffect(() => {
    if (isSuccessCreateCourse) {
      toast.success('Course Created successfully');
      setTimeout(() => {
        console.log('Redirecting to all-courses page...');
        redirect('/instructor/courses');
      }, 3000);
    }
    if (isSuccessEditCourse) {
      toast.success('Course Edited successfully');
    }
    if (errorCreateCourse) {
      if ('data' in errorCreateCourse) {
        console.log('CREATE COURSE API ERROR => ', errorCreateCourse);
        const errorData = errorCreateCourse as any;
        toast.error(errorData.data.message);
      }
    }
    if (errorEditCourse) {
      if ('data' in errorEditCourse) {
        console.log('EDIT COURSE API ERROR => ', errorEditCourse);
        const errorData = errorEditCourse as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccessCreateCourse, errorCreateCourse, errorEditCourse, isSuccessEditCourse]);


  return (
    <div className="w-full flex min-h-screen pb-20">
      <div className="w-[80%] ">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
            categories={allCategories?.layout?.categories}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            active={active}
            setActive={setActive}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            isEdit={isEdit}
            courseData={courseData}
            active={active}
            setActive={setActive}
            isLoadingCreateCourse={isLoadingCreateCourse || isLoadingEditCourse}
            isSuccessCreateCourse={isSuccessCreateCourse}
            handleCreateCourse={handleCreateCourse}
          />
        )}
      </div>

      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0 ">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
