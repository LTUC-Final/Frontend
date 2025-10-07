import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const OrdersSummary = ({
  data,
  data2,
  COLORS,
  report,
  assistantMessagesSupport,
  formatDateLocal,
}) => {
  return (
    <div className="space-y-6">
      {/* Charts Section */} {/* Assistant Messages */}
      <div className="p-6 bg-gradient-to-br from-background to-muted/20 rounded-lg border border-border shadow-sm">
        {assistantMessagesSupport.length > 0 && (
          <div className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <div className="space-y-3 text-foreground/90 leading-relaxed">
                {assistantMessagesSupport[
                  assistantMessagesSupport.length - 1
                ].content
                  .split("\n")
                  .filter((line) => line.trim())
                  .map((line, index) => (
                    <p
                      key={index}
                      className="text-pretty text-base leading-7 text-foreground/90 first:text-lg first:font-medium first:text-foreground"
                    >
                      {line}
                    </p>
                  ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </div>
                <span className="font-medium">Assistant Response</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-6 mt-12 justify-center items-center">
        {/* Total price by Status */}
        <div className="w-full md:w-1/2 bg-card p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-center mb-4">
            Total price by Status
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: $${value.toFixed(0)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Total count by Status */}
        <div className="w-full md:w-1/2 bg-card p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-center mb-4">
            Total count by Status
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data2}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value.toFixed(0)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data2.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Report Cards */}
      <div className="flex flex-wrap gap-6 justify-center">
        {Object.entries(report).map(([status, data]) => (
          <div
            key={status}
            className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50
                 w-full sm:w-[48%] lg:w-[32%] xl:w-[24%]"
          >
            {/* Status Header */}
            <div className="mb-4 pb-4 border-b border-border/50">
              <h4 className="text-lg font-semibold text-foreground capitalize tracking-tight">
                {status}
              </h4>
            </div>

            {/* Metrics Grid */}
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground font-medium">
                  Orders
                </span>
                <span className="text-2xl font-bold text-foreground tabular-nums">
                  {data.count}
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground font-medium">
                  Quantity
                </span>
                <span className="text-xl font-semibold text-foreground tabular-nums">
                  {data.totalQuantity}
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-2 border-t border-border/30">
                <span className="text-sm text-muted-foreground font-medium">
                  Total Amount
                </span>
                <span className="text-2xl font-bold text-primary tabular-nums">
                  ${data.totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-3 mt-3 border-t border-border/30">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Last Order
                </span>
                <span className="text-sm font-medium text-foreground tabular-nums">
                  {data.lastOrder ? formatDateLocal(data.lastOrder) : "—"}
                </span>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersSummary;
