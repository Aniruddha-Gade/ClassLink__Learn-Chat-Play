
import React, { useEffect, useState } from "react";


type Props = {
    allUsers:any
}

const AllUsers:React.FC<Props> = ({allUsers}) => {



    return (
        <div className="">
            <div className='text-7xl font-bold text-red-600 '>
                All students
            </div>
        </div>
    );

};

export default AllUsers;
