import "@styles/global.css";
import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
import SuspenseBoundary from "@components/SuspenseBoundary";

const metadata = {
	title: "prompthub",
	description: "Discover and share AI prompts with the help of AI",
};

function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Provider>
					<div className="main">
						<div className="gradient" />
					</div>
					<main className="app"> 
						<Navbar />
						<SuspenseBoundary>

						{children}

						</SuspenseBoundary>
					</main>
				</Provider>
			</body>
		</html>
	);
}

export default RootLayout;
