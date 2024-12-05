'use client'

import React, { useState, useEffect } from 'react'
import { useUpdateHeroDataMutation } from '../../../../redux/features/layout/layoutApi'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "../../ui/accordion"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react';
import CircleLoader from "../../Loader/CircleLoader"


interface Props {
    allFAQs: {
        _id?: string;
        question: string;
        answer: string;
    }[];
}

const EditFaq: React.FC<Props> = ({ allFAQs }) => {

    const [updateHeroData, { isLoading, isSuccess }] = useUpdateHeroDataMutation();

    const [questions, setQuestions] = useState(allFAQs)
    const [newQuestion, setNewQuestion] = useState("")
    const [newAnswer, setNewAnswer] = useState("")

    // handle Add FAQ
    const handleAddFAQ = () => {
        if (newQuestion === "" || newAnswer === "") {
            toast.error("Faq question/answer is required")
            return
        }

        const newFaq = {
            question: newQuestion,
            answer: newAnswer,
        }
        setQuestions([...questions, newFaq])
        setNewQuestion('');
        setNewAnswer('');
    }

    // handle Delete FAQ
    const handleDeleteFAQ = (index: Number) => {
        const updatedFAQs = questions.filter((_, i: Number) => i != index)
        setQuestions(updatedFAQs)

    }

    // Handle Save Updates
    const handleSave = async () => {
        const hasChanged = JSON.stringify(questions) !== JSON.stringify(allFAQs);
        if (!hasChanged) {
            toast.error('No changes detected. Please make updates before saving!');
            return;
        }

        try {
            await updateHeroData({ type: 'FAQ', faq: questions });
        } catch (error) {
            toast.error('Failed to update FAQs. Please try again later.');
        }
    };


    useEffect(() => {
        if (isSuccess) {
            toast.success('FAQs saved successfully!')
        }
    }, [isSuccess])



    return (
        <div className='w-[90%] 880px:w-[80%] m-auto mt-[80px] mb-[120px] text-black dark:text-white'>

            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Add New FAQ</h2>
                <div className="space-y-4">
                    <Input
                        className="w-full p-2 outline outline-black/50 dark:outline-white/50 rounded"
                        type="text"
                        placeholder="Enter a Question"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                    />
                    <Input
                        className="w-full p-2 outline outline-black/50 dark:outline-white/50 rounded"
                        placeholder="Enter a Answer"
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                    />
                    <Button
                        className="px-4 py-2 bg-green-500 dark:bg-green-500 text-white dark:text-white hover:bg-green-600 dark:hover:bg-green-600 rounded"
                        onClick={handleAddFAQ}
                    >
                        Add FAQ
                    </Button>
                </div>
            </div>

            <Accordion type="single" collapsible>
                {
                    questions?.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className='text-xl'>{faq.question}</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-2">
                                    <p>{faq.answer}</p>
                                    <button
                                        className="p-1 text-red-500 hover:text-red-600"
                                        onClick={() => handleDeleteFAQ(index)}
                                    >
                                        <Trash2 />
                                    </button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))
                }
            </Accordion>


            <div className="mt-8">
                <Button
                    className={` ${isLoading && 'px-12 opacity-50 cursor-not-allowed'}`}
                    onClick={handleSave}
                    disabled={isLoading}
                >
                    {isLoading ? <CircleLoader/> : 'Save Changes'}
                </Button>
            </div>

        </div>
    )
}

export default EditFaq
