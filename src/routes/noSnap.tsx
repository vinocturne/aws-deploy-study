import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useState } from "react";
import supabase from "../utils/supabase";
import { Helmet } from "react-helmet-async";

export const Route = createFileRoute("/noSnap")({
	component: NoSnap,
});

function NoSnap() {
	return <>No Snap</>;
}
