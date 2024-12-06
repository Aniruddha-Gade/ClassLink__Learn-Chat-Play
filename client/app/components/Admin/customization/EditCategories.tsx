'use client';

import React, { useState, useEffect } from 'react';
import { useUpdateHeroDataMutation } from '../../../../redux/features/layout/layoutApi';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import CircleLoader from "../../Loader/CircleLoader"



interface Props {
  allCategories: {
    _id?: string;
    title: string;
  }[];
}

const EditCategories: React.FC<Props> = ({ allCategories }) => {
  const [categories, setCategories] = useState(allCategories);
  const [updateHeroData, { isLoading, isSuccess }] = useUpdateHeroDataMutation();

  // handle Categorie sAdd
  const handleCategoriesAdd = (id: any, title: string) => {
    setCategories((prevCategories: any) =>
      prevCategories.map((category: any) =>
        category._id === id ? { ...category, title } : category
      )
    );
  };

  // new Category Handler
  const newCategoryHandler = () => {
    if (categories[categories.length - 1]?.title === '') {
      toast.error('Category title cannot be empty');
    } else {
      setCategories((prevCategories) => [
        ...prevCategories,
        { _id: uuidv4(), title: '' },
      ]);
    }
  };

  // are Categories Unchanged
  const areCategoriesUnchanged = (originalCategories: any[], newCategories: any[]):boolean => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  // is Any Category Title Empty
  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((item) => item.title === '');
  };

  // edit Categories Handler
  const editCategoriesHandler = async () => {
    try {
      const updatedCategories = categories.map(({ _id, ...rest }: any) => rest)
      await updateHeroData({ type: 'Categories', categories: updatedCategories });
    } catch (error) {
      toast.error('Failed to update categories. Please try again.');
    }
  };


  const isDisabled =
    areCategoriesUnchanged(allCategories, categories) || isAnyCategoryTitleEmpty(categories);


  useEffect(() => {
    if (isSuccess) {
      toast.success('Categories updated successfully!');
    }
  }, [isSuccess])


  return (
    <div className="w-[90%] 880px:w-[80%] m-auto mt-[80px] mb-[120px] text-black dark:text-white">
      <div className="text-center">
        
        <h1 className="text-xl">All Categories</h1>

        <div>
          {categories.map((item, index) => (
            <div className="p-3" key={index}>
              <div className="flex gap-3 items-center w-full justify-center">
                <Input
                  className="w-1/2 p-2 outline outline-black/50 dark:outline-white/50 rounded"
                  value={item.title}
                  onChange={(e) => handleCategoriesAdd(item?._id, e.target.value)}
                  placeholder="Enter category title..."
                />
                <Trash2
                  className="dark:text-white text-black hover:text-red-500 dark:hover:text-red-500 cursor-pointer"
                  onClick={() =>
                    setCategories((prevCategories: any) =>
                      prevCategories.filter((i: any) => i._id !== item._id)
                    )
                  }
                />
              </div>
            </div>
          ))}

          <div className="flex-center">
            <Image
              src="/assets/icons/add-icon.png"
              width={40}
              height={40}
              className="cursor-pointer"
              onClick={newCategoryHandler}
              alt="Add"
            />
          </div>
        </div>

        <div
          className={`w-[100px] min-h-[40px] h-[40px] text-center flex items-center justify-center rounded
          ${isDisabled ? 'cursor-not-allowed bg-[#cccccc34]' : 'cursor-pointer bg-[#42d383]'}
        `}
          onClick={isDisabled ? undefined : editCategoriesHandler}
        >
          {isLoading ? <CircleLoader /> : 'Save'}
        </div>


      </div>
    </div>
  );
};

export default EditCategories;
