import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/user/create')({
  component: RouteComponent
});

function RouteComponent() {
  return <div>Hello "/user/create"!</div>;
}
