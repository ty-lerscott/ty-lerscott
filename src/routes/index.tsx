import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-2">
      <h1>Welcome Home!</h1>
    </div>
  )
}