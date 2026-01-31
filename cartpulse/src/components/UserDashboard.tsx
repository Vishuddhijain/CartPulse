// import React from 'react'
// import HeroSection from './HeroSection'
// import CategorySlider from './CategorySlider'
// import connectDb from '@/lib/db'
// import Grocery, { IGrocery } from '@/models/grocery.model'
// import GroceryItemCard from './GroceryItemCard'

// async function UserDashboard({groceryList}:{groceryList:IGrocery[]}) {
// await connectDb()
// const plainGrocery = JSON.parse(JSON.stringify(groceryList))

//   return (
//     <>
//       <HeroSection/>
//       <CategorySlider/>
//       <div className='w-[90%] md:w-[80%] mx-auto mt-10'>
//         <h2 className='text-2xl md:text-3xl font-bold text-green-700 mb-6 text-center'>Popular Grocery Items</h2>
//         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'> 
//           {plainGrocery.map((item:any,index:number)=>(
//         <GroceryItemCard key={index} item={item}/>
//       ))}
//       </div>

//       </div>
     
//     </>
//   )
// }

// export default UserDashboard


import React from 'react'
import HeroSection from './HeroSection'
import CategorySlider from './CategorySlider'
import connectDb from '@/lib/db'
import Grocery, { IGrocery } from '@/models/grocery.model'
import GroceryItemCard from './GroceryItemCard'

async function UserDashboard({ groceryList }: { groceryList: IGrocery[] }) {
  await connectDb()

  const plainGrocery = JSON.parse(JSON.stringify(groceryList))

  // ✅ GROUP BY CATEGORY
  const groupedByCategory = plainGrocery.reduce(
    (acc: any, item: any) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {}
  )

  return (
    <>
      <HeroSection />
      <CategorySlider />

      <div className="w-[90%] md:w-[80%] mx-auto mt-10">

        {Object.entries(groupedByCategory).map(
          ([category, items]: any) => (
            <div key={category} className="mb-12">

              {/* ✅ CATEGORY TITLE */}
              <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-5">
                {category}
              </h2>

              {/* ✅ CATEGORY ITEMS */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {items.map((item: any, index: number) => (
                  <GroceryItemCard key={index} item={item} />
                ))}
              </div>

            </div>
          )
        )}

      </div>
    </>
  )
}

export default UserDashboard
