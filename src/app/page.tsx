import DashBoard from "./components/Dashboard";
import PortfolioDetails from "./components/PortfolioDetails";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex space-x-5">
        <PortfolioDetails />
        <DashBoard />
      </div>
    </main>
  );
}
