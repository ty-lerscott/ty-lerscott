import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/writings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <h1>Hello "/writings"!</h1>
}
