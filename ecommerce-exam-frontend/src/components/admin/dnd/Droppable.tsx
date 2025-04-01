import { useDroppable } from '@dnd-kit/core'

// Droppable Component
export default function Droppable({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div ref={setNodeRef} style={{}}>
      {children}
    </div>
  )
}
