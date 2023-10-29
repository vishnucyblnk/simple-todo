import React, { useEffect, useState } from 'react'

function Hom() {
    const [show, setShow] = useState(false);
    const [task,setTask] = useState('');
    const [allTask,setAlltask] = useState([]);
    const [editingIndex,setEditingIndex] = useState(-1);
    const [updateTaskValue,setUpdatetaskValue] =useState('');

    useEffect(() => {
        handleDisp()
    }, []);

    const handleShow = (index,taskk) => {
        setEditingIndex(index);
        setShow(!show)
        setTask(taskk)
    }; 

    const handleDisp = ()=>{
        const storedTask = JSON.parse(localStorage.getItem('tasks'));
        if (storedTask) {
            setAlltask(storedTask);
        }
        else{
            setAlltask([])
        }
    }

    const handleTask = ()=>{
        if(task !== ''){
            const newArr = [...allTask, task];
            setAlltask(newArr)
            setTask('');
            localStorage.setItem('tasks', JSON.stringify(newArr));
        }
        else{
            alert('Please fill the task')
        }

    }

    const handleDelete = (index)=>{
            const newArr = allTask;
            newArr.splice(index,1)
            setAlltask(newArr)
            localStorage.setItem('tasks', JSON.stringify(newArr));
            handleDisp()
    } 

    const handleEdit = (index)=>{
        if(task !== ''){
            const newArr = allTask
            newArr[index] = task
            setAlltask(newArr)
            localStorage.setItem('tasks', JSON.stringify(newArr));
            setEditingIndex(-1);
            setTask('');
        }
        else{
            alert('Please fill the task')
        }

    }
    const handleDeleteAll = () =>{
        setAlltask('')
        localStorage.setItem('tasks', JSON.stringify(''));
    }


  return (
    <div className='h-screen bg-gradient-to-r from-purple-500 to-pink-500'>
        <div className='flex flex-col justify-center items-center'>
            <div className='shadow-2xl mt-10 p-3 bg-white rounded-full'>
                <h1 className='p-3 text-center text-6xl font-bold text-red-700 text-shadow'>TODO LIST </h1>
            </div>
            <div className=' shadow-2xl flex w-1/2 bg-white p-3 rounded-full justify-center gap-6 m-6 '>  
        
                <input type="text" onChange={(e)=>setTask(e.target.value)} className="w-full bg-grey-300  text-gray-900 text-lg rounded-lg p-2.5 w-auto" placeholder="Enter task" require />
        
                <button type="button" className="text-red-600 bg-white hover:text-red-900 rounded-full p-2  text-center " onClick={handleTask}><i className="fa-solid fa-circle-plus text-5xl"></i></button>
    
            </div>
    
            {(allTask.length) > 0 ? 
                <div className='w-11/12'>
                    <div className='flex justify-between mb-5 '>
                        <div className='shadow-2xl p-3 bg-white rounded-full'>
                            <h5 className='w-full text-center text-2xl font-bold'>TASKS : </h5>
                        </div>
                        {
                            allTask.length>1 &&
                            <div className='shadow-2xl p-3 bg-white rounded-full'>
                                <button onClick={()=>handleDeleteAll()} className='text-red-700 text-3xl' type='button'><i class="fa-solid fa-trash"></i></button>
                            </div> 
                        }
                    </div>
                    <table className='w-full shadow-2xl text-sm text-center text-gray-500 '>
                        <thead className='text-lg text-gray-700 uppercase bg-gray-200'>
                            <tr>
                                <th className='px-6 py-3'>SL NO</th>
                                <th className='px-6 py-3'>TASK</th>
                                <th className='px-6 py-3'>ACTION</th>
                            </tr>
                        </thead>
                        <tbody className='text-lg text-gray-700 uppercase bg-gray-100'>
                            {
                                (allTask.map((taskk,index)=>
                                    <tr className='border border-bottom-50'>
                                        <td className='px-6 py-3 '>{index+1}</td>
                                        <td className='px-6 py-3' >
                                            {
                                            (index === editingIndex && show )?
                                                (<div >
                                                    <input className="bg-grey-300 border border-gray-500 text-gray-900 text-lg rounded-lg p-2.5 w-auto" type='text'  placeholder="Edit the task" value={task} onChange={(e) => setTask(e.target.value)}/>
                                                    <button type='button' className="text-white bg-blue-700 hover:bg-blue-800 rounded-full p-2  text-center " onClick={(e)=>handleEdit(index)}>UPDATE</button>
                                                </div>)
                                            :
                                            (taskk)
                                            }
                                        </td>
                                        <td className='px-6 py-3'>
                                            <button onClick={()=>handleShow(index,taskk)} className='pe-10 text-green-700' type='button'><i class="fa-solid fa-pen-to-square"></i></button>
                                            <button onClick={()=>handleDelete(index)} className='text-red-700' type='button'><i class="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))  
                            }
                        </tbody>
                    </table>
                </div>
            :
                 <p className='text-center text-lg font-bold'>No Task has been added</p>
            } 
        </div>
    </div>
  )
}

export default Hom