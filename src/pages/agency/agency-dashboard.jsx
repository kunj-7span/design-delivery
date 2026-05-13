import {
    Card,
    CardHeader,
    CardTitle,
    CardAction
} from "@/components/ui/card"
import {
  IdCardLanyard,
  User,
  SquareChartGantt,
  ClipboardClock,
  FileXCorner,
} from "lucide-react";

function AgencyDashboard() {

    const states = [
      {
        id: 1,
        name: "Total Projects",
        count: 10,
        icon: <SquareChartGantt size="25" />,
        bg: "bg-purple-100",
        text: "text-purple-700",
      },
      {
        id: 2,
        name: "Total Employees",
        count: 13,
        icon: <IdCardLanyard size="25" />,
        bg: "bg-blue-100",
        text: "text-blue-700",
      },
      {
        id: 3,
        name: "Total Clients",
        count: 7,
        icon: <User size="25" />,
        bg: "bg-emerald-100",
        text: "text-emerald-700",
      },
      {
        id: 4,
        name: "Total Pending Tasks",
        count: 23,
        icon: <ClipboardClock size="25" />,
        bg: "bg-orange-100",
        text: "text-orange-700",
      },
      {
        id: 5,
        name: "Total Rejected Tasks",
        count: 6,
        icon: <FileXCorner size="25" />,
        bg: "bg-red-100",
        text: "text-red-700",
      },
    ];
    return (
      <>
        <h2 className="text-xl font-medium">Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {states.map((item) => (
            <Card key={item.id}>
              <CardHeader className="flex justify-between items-center">
                <CardTitle>
                  <div className={`p-3 rounded-lg inline-flex ${item.bg}`}>
                    {item.icon}
                  </div>
                </CardTitle>
                <CardAction className="text-end">
                  <span className={`text-2xl font-semibold ${item.text}`}>
                    {item.count}
                  </span>
                  <p className="font-semibold">{item.name}</p>
                </CardAction>
              </CardHeader>
            </Card>
          ))}
        </div>
      </>
    );
}

export default AgencyDashboard;