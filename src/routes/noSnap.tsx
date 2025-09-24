import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/noSnap")({
	component: NoSnap,
});

function NoSnap() {
	return <>No Snap</>;
}
