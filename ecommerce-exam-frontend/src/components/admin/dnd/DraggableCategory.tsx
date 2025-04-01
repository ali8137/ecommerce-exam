import { useDraggable } from "@dnd-kit/core"
import AdminCategory from "../AdminCategory"

interface categoryType {
  id: string
  title: string
  description: string
  categoryListingOrder: number
}


// Draggable Component of dnd-kit for dragging categories
const DraggableCategory = ({ category }: { category: categoryType }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: category.id,
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
        cursor: 'grab',
      }}
    >
      <AdminCategory key={category.id as string} {...category} isAdmin={true} />
    </div>
  )
}

export default DraggableCategory