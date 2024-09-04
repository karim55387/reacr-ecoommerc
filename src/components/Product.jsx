import React, { useEffect, useState } from 'react'
import FeaturedProducts from './FeaturedProduct'
import { getCategories } from '../Apis/getCatrgories'
import { getProductwithCategories } from '../Apis/getProduct'

export default function Product() {

  let [msg, setMsg] = useState('')
  let [arr,setArr] = useState([])
  let [loading, setloading] = useState(false)
  let [categoriesArr, setcategoriesArr] = useState([])

  async function getCategoriesApi()
   {
    setloading(true)
    let data = await getCategories()
    

    if (data?.data) {
      setcategoriesArr(data?.data)
      setMsg('')
      setloading(false)
      console.log('test');

    }


    else {
      setMsg(data?.message)
      setloading(false)
    }
  }

  useEffect(()=>{
    getCategoriesApi()
  },[])

 async function getData(id)
  {
   let data = await getProductwithCategories(id) 
   setArr(data.data);
   
      
  }



  return (
    <div>
      <div className="row">
        <ul>
            {categoriesArr?.map(ele=><li key={ele} onClick={()=>getData(ele?._id)} className='cursor-pointer font-bold'>{ele?.name}</li>)}
        </ul>
      </div>
      <FeaturedProducts arr={arr} />
    </div>
  )
}
