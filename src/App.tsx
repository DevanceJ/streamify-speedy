import { useMetricsStore } from "./store/streamStore";
import { useMonthStore, useStore } from "./store/stateStore";
import { ComboboxMonth } from "./components/ui/combobox";
import { UserGrowthChart } from "./components/dashboard/linechart";
import { CardComponent } from "./components/dashboard/card";
import { RevenueChart } from "./components/dashboard/piechart";
import { Streams } from "./components/dashboard/table/streams";
import { StreamChart } from "./components/dashboard/barchart";
import { Users, Music4, IndianRupee, Home } from "lucide-react";
import { Button } from "./components/ui/button";
import { Moon, Sun } from "lucide-react";

const App = () => {
  const { monthlyMetrics } = useMetricsStore();
  const { currentMonth } = useMonthStore();
  const { darkMode, setDarkMode } = useStore();
  const currentMonthData = monthlyMetrics[currentMonth] || {};

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <aside className="w-full md:w-64 p-4 md:p-6 shadow">
        <div className="flex items-center mb-6">
          <Home className="mr-2" />
          {">"}
          <span className="text-lg font-semibold ml-1">
            My listening status
          </span>
          <Button
            className="sm:hidden flex ml-auto"
            variant="outline"
            onClick={() => {
              setDarkMode(!darkMode);
              document.body.classList.toggle("dark");
            }}>
            {darkMode ? <Sun /> : <Moon />}
          </Button>
        </div>
        <div className="space-y-4">
          <CardComponent
            title="Top Artist"
            amount={currentMonthData.topArtist}
            icon={<Users className="text-blue-500" />}
          />
          <CardComponent
            title="Total Streams"
            amount={currentMonthData.totalStreams}
            icon={<Music4 className="text-green-500" />}
          />
          <CardComponent
            title="Revenue"
            amount={currentMonthData.revenue}
            icon={<IndianRupee className="text-yellow-500" />}
          />
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <header className="mb-6 flex justify-center items-center flex-wrap sm:justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">
            Streamify Dashboard
          </h1>
          <ComboboxMonth />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RevenueChart />
          <StreamChart />
        </div>
        <UserGrowthChart />

        <div className="p-4 rounded-lg shadow mt-6">
          <h2 className="text-xl font-semibold mb-4">Top Streams</h2>
          <Streams />
        </div>
      </main>
    </div>
  );
};

export default App;
