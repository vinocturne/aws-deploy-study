import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "outline";
	size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = "primary", size = "md", ...props }, ref) => {
		const baseClasses =
			"inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

		const variants = {
			primary: "bg-blue-600 text-white hover:bg-blue-700",
			secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
			outline:
				"border border-gray-300 bg-white text-gray-900 hover:bg-gray-50",
		};

		const sizes = {
			sm: "h-8 px-3 text-sm",
			md: "h-10 px-4",
			lg: "h-12 px-6 text-lg",
		};

		return (
			<button
				className={cn(
					baseClasses,
					variants[variant],
					sizes[size],
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);

Button.displayName = "Button";

export { Button };
