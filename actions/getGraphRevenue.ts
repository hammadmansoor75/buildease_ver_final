import prismadb from "@/lib/prismadb";

interface GraphData {
  name: string;
  total: number;
}

export const getGraphRevenue = async (projectId: string): Promise<GraphData[]> => {
  const monthlyRevenue: { [key: number]: number } = {};

  const tasks = await prismadb.task.findMany({
    where : {
      projectId : projectId
    }
  })

  const formattedTasks = tasks.map((task) => {
    month : task.startingDate;
    budget : task.budget
  })

  console.log(formattedTasks)


  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = [
    { name: "Jan", total: 10 },
    { name: "Feb", total: 20 },
    { name: "Mar", total: 50 },
    { name: "Apr", total: 100 },
    { name: "May", total: 10 },
    { name: "Jun", total: 20 },
    { name: "Jul", total: 10 },
    { name: "Aug", total: 20 },
    { name: "Sep", total: 30 },
    { name: "Oct", total: 40 },
    { name: "Nov", total: 50 },
    { name: "Dec", total: 10 },
  ];

  // Filling in the revenue data
  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData;
};