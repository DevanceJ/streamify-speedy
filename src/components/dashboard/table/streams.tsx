import { DataTable } from "@/components/dashboard/table/datatable";
import { columns } from "@/components/dashboard/table/columns";
import { useMetricsStore } from "@/store/streamStore";

export const Streams = () => {
  const { streamDetails } = useMetricsStore();

  return (
    // <DataTable<StreamDetail, string> columns={columns} data={streamDetails} />
    <DataTable columns={columns} data={streamDetails} />
  );
};
