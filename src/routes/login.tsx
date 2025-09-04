import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useState } from "react";
import supabase from "../utils/supabase";

export const Route = createFileRoute("/login")({
	component: Login,
});

const loginSchema = z.object({
	email: z.string().email("올바른 이메일 주소를 입력해주세요"),
	password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
});

type LoginForm = z.infer<typeof loginSchema>;

function Login() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginForm) => {
		setIsLoading(true);
		setError(null);

		try {
			const { error } = await supabase.auth.signInWithPassword({
				email: data.email,
				password: data.password,
			});

			if (error) {
				setError(error.message);
			} else {
				window.location.href = "/";
			}
		} catch (err) {
			console.error(err);
			setError("로그인 중 오류가 발생했습니다.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-[50vw] min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full space-y-8 px-4">
				<div>
					<h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
						로그인
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						계정에 로그인하세요
					</p>
				</div>

				<form
					className="mt-8 space-y-6"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="space-y-4">
						<Input
							{...register("email")}
							type="email"
							label="이메일"
							placeholder="이메일을 입력하세요"
							error={errors.email?.message}
							disabled={isLoading}
						/>

						<Input
							{...register("password")}
							type="password"
							label="비밀번호"
							placeholder="비밀번호를 입력하세요"
							error={errors.password?.message}
							disabled={isLoading}
						/>
					</div>

					{error && (
						<div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
							{error}
						</div>
					)}

					<Button
						type="submit"
						className="w-full"
						disabled={isLoading}
					>
						{isLoading ? "로그인 중..." : "로그인"}
					</Button>
				</form>

				<div className="text-center">
					<a
						href="/"
						className="text-blue-600 hover:text-blue-500 text-sm"
					>
						메인으로 돌아가기
					</a>
				</div>
			</div>
		</div>
	);
}
