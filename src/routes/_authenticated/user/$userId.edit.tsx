import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/user/$userId/edit')({
  component: RouteComponent
});

function RouteComponent() {
  return <div>Hello "/user/$userId/edit"!</div>;
}
