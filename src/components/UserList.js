import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UserList = () => {

    const [userData, setUserData] = useState([]);

    const getUserData = async ()=>{
        const res = await axios.get('/getusers');
        console.log()
        if(res.data.users.length > 0)
            setUserData(res.data.users);
    }

    useEffect(()=>{
        getUserData();

    }, [userData])

    // console.log(userData)

    const handleEdit = async (id)=>{
        
        const userName = prompt("Enter Name");
        const userEmail = prompt("Enter Email");

        if(!userName || !userEmail){
            alert('Please provide both name and email');
        }
        else{
            const res = await axios.put(`/edituser/${id}`, {
                name:userName,
                email:userEmail
            });
            console.log(res.data.message);
        }
    }

    const handleDelete = async (id)=>{

        const res = await axios.delete(`/delete/${id}`);
        console.log(res.data.message);

    }

  return (
    <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-col text-center w-full mb-8">
        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
          All Users
        </h1>
      </div>
      <div className="lg:w-2/3 w-full mx-auto overflow-auto">
        <table className="table-auto w-full text-left whitespace-no-wrap">
          <thead>
            <tr>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                Name
              </th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                Email
              </th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                Edit
              </th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.map(element=>{
                return(
                    <tr key={element._id}>
                    <td className="px-4 py-3">{element.name}</td>
                    <td className="px-4 py-3">{element.email}</td>
                    <td className="px-4 py-3">
                      <button className="hover:text-green-500" onClick={()=>handleEdit(element._id)}>Edit</button>
                    </td>
                    <td className="px-4 py-3 text-lg text-gray-900">
                      <button className="hover:text-red-500" onClick={()=>handleDelete(element._id)}>Delete</button>
                    </td>
                  </tr>
                )
            })}
   
          </tbody>
        </table>
      </div>
    </div>
  </section>
  )
}

export default UserList