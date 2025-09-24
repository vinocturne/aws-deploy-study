import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useState } from "react";
import supabase from "../utils/supabase";
import { Helmet } from "react-helmet-async";

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
		<>
			<Helmet>
				<title>로그인 - 커뮤니티</title>
				<meta
					name="description"
					content="커뮤니티에 로그인하여 다양한 기능을 이용해보세요. 이메일과 비밀번호로 간편하게 로그인할 수 있습니다."
				/>
				<meta
					name="keywords"
					content="로그인, 커뮤니티, 회원가입, 이메일 로그인"
				/>

				{/* Open Graph */}
				<meta property="og:title" content="커뮤니티 로그인" />
				<meta
					property="og:description"
					content="로그인하여 커뮤니티에 참여하세요"
				/>
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content="https://yourdomain.com/login"
				/>

				{/* Twitter Card */}
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content="커뮤니티 로그인" />
				<meta
					name="twitter:description"
					content="로그인하여 커뮤니티에 참여하세요"
				/>

				{/* Canonical URL */}
				<link rel="canonical" href="https://yourdomain.com/login" />
			</Helmet>

			<div className="w-[50vw] min-h-screen flex items-center justify-center bg-gray-50">
				<div className="max-w-md w-full space-y-8 px-4">
					<div>
						<h1 className="mt-6 text-center text-3xl font-bold text-gray-900">
							로그인
						</h1>
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
								error={errors.email && errors.email.message}
								disabled={isLoading}
							/>

							<Input
								{...register("password")}
								type="password"
								label="비밀번호"
								placeholder="비밀번호를 입력하세요"
								error={
									errors.password && errors.password.message
								}
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
		</>
	);
}
