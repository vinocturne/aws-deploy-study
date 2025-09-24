import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import type { User } from "@supabase/supabase-js";
// import { Helmet } from "react-helmet-async";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	console.log("user", user);

	useEffect(() => {
		const getUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUser(user);
			setLoading(false);
		};

		getUser();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_, session) => {
			setUser(session?.user ?? null);
		});

		return () => subscription.unsubscribe();
	}, []);

	if (loading) {
		return (
			<>
				{/* <Helmet>
					<title>로딩 중... - 커뮤니티</title>
					<meta name="description" content="로딩 중 페이지 입니다." />
				</Helmet> */}
				<div className="flex items-center justify-center min-h-screen">
					<div className="text-lg">로딩 중...</div>
				</div>
			</>
		);
	}

	return (
		<>
			{/* <Helmet>
				<title>
					{user && user?.email
						? `${user.email}로 로그인 된 화면`
						: "로그인 되지 않은 화면"}
				</title>
				<meta
					name="description"
					content={`${user && user?.email ? `${user?.email}로 로그인 완료 페이지의 description` : "로그인 하지 않은 페이지의 description "}`}
				/>
			</Helmet> */}
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-4xl mx-auto">
					{user ? (
						<div className="text-center">
							<h1 className="text-4xl font-bold text-gray-900 mb-6">
								환영합니다, {user.email}님!
							</h1>
							<p className="text-xl text-gray-600 mb-8">
								메인 화면입니다.
							</p>
						</div>
					) : (
						<div className="text-center">
							<h1 className="text-4xl font-bold text-gray-900 mb-6">
								커뮤니티에 오신 것을 환영합니다
							</h1>
							<p className="text-xl text-gray-600 mb-8">
								로그인하지 않아도 둘러볼 수 있습니다.
							</p>
							<a
								href="/login"
								className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
							>
								로그인하기
							</a>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
