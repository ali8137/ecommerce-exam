'use client'

import { getCategories } from '@/utils/api'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { DndContext, DragOverEvent } from '@dnd-kit/core'
import DraggableCategory from '@/components/admin/dnd/DraggableCategory'
import Droppable from '@/components/admin/dnd/Droppable'
import { Button } from '@mui/material'
import { useAppDispatch } from '@/redux/store'
import { updateCategoriesOrder } from '@/redux/features/category/categorySlice'

interface categoryType {
  id: string
  title: string
  description: string
  categoryListingOrder: number
}

export default function DragAndDrop() {
  const [categories, setCategories] = useState<categoryType[]>([])

  const router = useRouter()

  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/login')
      return
    }

    //TODO: instead of the below, we could have just tried to get the value of the categories from the 
    // redux toolkit, or at least trigger the category fetching function there
    const fetchCategories = async (): Promise<void> => {
      // setIsLoading(true);
      try {
        const responseData: categoryType[] = await getCategories({
          authToken: token,
        })

        // console.log('Fetched categories:', responseData)

        setCategories(responseData as categoryType[])
      } catch (err) {
        // setError('An error occurred while fetching categories.')
        console.error(err)
      } finally {
        // setIsLoading(false);
      }
    }

    fetchCategories()
  }, [router])

  // handle dragOver event of dnd-kit
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const draggedId = active.id
    const targetId = over.id

    if (draggedId !== targetId) {
      setCategories((prevOrder) => {
        const newOrder = [...prevOrder]
        const draggedIndex = newOrder.findIndex(
          (category) => category.id === draggedId
        )
        const targetIndex = newOrder.findIndex(
          (category) => category.id === targetId
        )

        // remove dragged item from the list
        newOrder.splice(draggedIndex, 1)
        // find the dragged category
        const draggedCategory = categories.find(
          (category) => category.id === draggedId
        )
        // add the dragged category at the target index
        newOrder.splice(targetIndex, 0, draggedCategory as categoryType)

        // console.log("new order", newOrder)

        // change the value of the property CategoryListingOrder based on the new index order of the categories
        newOrder.map((category, index) => {
          category.categoryListingOrder = index + 1
        })

        // console.log("new order", newOrder)

        return newOrder
      })
    }
  }

  const sendTheNewCategoriesOrder = async () => {
    const updatedCategories = [...categories]
    const newOrder = updatedCategories.map((category) => {
      return {
        id: category.id,
        categoryListingOrder: category.categoryListingOrder.toString(),
      }
    })

    dispatch(
      updateCategoriesOrder({
        authToken: localStorage.getItem('token') as string,
        newCategoriesOrder: newOrder  ,
      })
    )
  }

  return (
    <>
      <DndContext /*onDragEnd={handleDragOver}*/ onDragOver={handleDragOver}>
        <div className="flex flex-col gap-4 p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
          {categories.map((category) => (
            <Droppable key={category.id} id={category.id}>
              <DraggableCategory category={category} />
            </Droppable>
          ))}
        </div>
      </DndContext>

      <div>
        <Button
          variant="contained"
          sx={{ mt: 2, mb: 4, mx: 'auto', display: 'block' }}
          onClick={sendTheNewCategoriesOrder}
        >
          Save the new categories order
        </Button>
      </div>
    </>
  )
}
