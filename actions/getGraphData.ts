import prisma from "@/libs/prismadb";
import moment from "moment";

export default async function getGraphData() {
  try {
    //get the start and end dates for the data range (7days ago to today)
    const startDate = moment().subtract(6, "days").startOf("day");

    const endDate = moment().endOf("day");

    //Quer the database to get order data grouped by createData
    const result = await prisma.order.groupBy({
      by: "createdAt",
      where: {
        createdAt: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
        status: "complete",
      },
      _sum: {
        amount: true,
      },
    });

    //Initialize an object to aggregate the data by day

    const aggregatedData: {
      [day: string]: { day: string; date: string; totalAmount: number };
    } = {};

    //create a clone of the start date to iterate over each day

    const currentDate = startDate.clone();

    //iterate over day in  the date range

    while (currentDate <= endDate) {
      //format the day as a string (e.g,, "Monday")

      const day = currentDate.format("dddd");
      console.log("day<<<", day, currentDate);

      //initialize the aggregated data for the day with the day , date, and totalAmount

      aggregatedData[day] = {
        day,
        date: currentDate.format("YYYY-MM-DD"),
        totalAmount: 0,
      };

      //move to the nex day
      currentDate.add(1, "day");
    }

    //calculate the total amount for each day by summming the order amounts

    result.forEach((entry) => {
      const day = moment(entry.createdAt).format("dddd");
      const amount = entry._sum.amount || 0;
      aggregatedData[day].totalAmount += amount;
    });

    //Convert the  aggregatedData object to an array and sort it by date

    const formattedData = Object.values(aggregatedData).sort((a, b) =>
      moment(a.date).diff(moment(a.date))
    );
    return formattedData;
  } catch (error) {
    throw new Error(error as any);
  }
}
