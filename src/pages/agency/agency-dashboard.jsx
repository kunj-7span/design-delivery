import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    IdCardLanyard,
    User,
    SquareChartGantt,
    ClipboardClock
} from "lucide-react";

function AgencyDashboard() {

    const states = [
        { id: 1, name: "Total Projects", count: 10, icon: <SquareChartGantt />, bg: "purple"},
        { id: 2, name: "Total Employees", count: 13, icon: <IdCardLanyard />, bg: "blue"},
        { id: 3, name: "Total Clients", count: 7, icon: <User />, bg: "emerald"},
        { id: 4, name: "Total Pending Tasks", count: 23, icon: <ClipboardClock />, bg: "orange"}
    ]
    console.log(states[2].totalClients)
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {states.map((item) => (
                    <Card key={item.id}>
                        <CardHeader>
                            <CardTitle>
                                <div className={`p-3 rounded-lg inline-flex bg-${item.bg}-100 text-${item.bg}-700`}>
                                    {item.icon}
                                </div>
                            </CardTitle>
                            <CardDescription>{item.name}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <span className={`text-2xl font-semibold text-${item.bg}-700`}>{item.count}</span>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
}

export default AgencyDashboard;