import React from 'react'
import useCart from '../../hooks/useCart'
import {FaTrash} from 'react-icons/fa'
import Swal from 'sweetalert2'

const CartPage = () => {
    const [cart, refetch] = useCart();

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              fetch(`http://localhost:6001/carts/${item._id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
              }).then(res => res.json()).then(data => {
                if(data.deletedCount > 0){
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                }
              })
            }
          });
    }
    
  return (
    <div className='section-container'>
         <div className='section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
        <div className='py-28 flex flex-col justify-center items-center gap-8'>
           
            {/* Text    */}
            <div className='space-y-7 px-4'>
                    <h1 className='md:text-5x1 text-4xl font-bold md:leading-snug leading-snug'>
                        Items of cart
                    </h1>            
            </div>
        </div>
        </div>

        {/* tables of cart */}

        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead className='bg-green text-white rounded-sm'>
      <tr>
        <th>#</th>
        <th>Food</th>
        <th>Item name</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        {/* row 1 */}
        {
            cart.map((item,index)=> (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                        <div className="flex items-center gap-3">
                            <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src={item.image} alt="" />
                                </div>
                            </div>
                        </div>
                    </td>
                    <td className='font-medium'>
                       {item.name}
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <th>
                        <button className="btn btn-ghost btn-xs text-red" onClick={()=> handleDelete(item)}>
                            <FaTrash/>
                        </button>
                    </th>
              </tr>
            ))
        }
    </tbody>
    
            
        </table>
        </div>
    </div>
  )
}

export default CartPage