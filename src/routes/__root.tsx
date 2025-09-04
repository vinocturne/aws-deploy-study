import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: () => (
		<div className="w-[100%] flex justify-center min-h-screen bg-gray-50">
			<Outlet />
		</div>
	),
});
