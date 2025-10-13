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
      <div className="p-6 bg-[#FFF6E9] rounded-lg border-2 border-[#F5C45E] shadow-lg transition-all hover:border-[#E78B48] hover:shadow-xl">
        {assistantMessagesSupport.length > 0 && (
          <div className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <div className="space-y-3 text-[#102E50]/90 leading-relaxed">
                {assistantMessagesSupport[
                  assistantMessagesSupport.length - 1
                ].content
                  .split("\n")
                  .filter((line) => line.trim())
                  .map((line, index) => (
                    <p
                      key={index}
                      className="text-pretty text-base leading-7 text-[#102E50]/90 first:text-lg first:font-medium first:text-[#102E50]"
                    >
                      {line}
                    </p>
                  ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-[#F5C45E]/50">
              <div className="flex items-center gap-2 text-sm text-[#5A6B7D]">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5C45E]/75 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F5C45E]"></span>
                </div>
                <span className="font-medium">Assistant Response</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-6 mt-12 justify-center items-center">
        {/* Total price by Status */}
        <div className="w-full md:w-1/2 bg-white p-8 rounded-xl shadow-xl border-2 border-[#F5C45E] hover:shadow-2xl transition-shadow">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#102E50]">
            Total Price by Status
          </h2>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: $${value.toFixed(0)}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="#FFF6E9"
                  animationBegin={0}
                  animationDuration={1000}
                  isAnimationActive={true}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                // contentStyle={{
                //   backgroundColor: "#FFF6E9",
                //   border: "2px solid #F5C45E",
                //   borderRadius: "8px",
                //   color: "#102E50",
                // }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Total count by Status */}
        <div className="w-full md:w-1/2 bg-white p-8 rounded-xl shadow-xl border-2 border-[#F5C45E] hover:shadow-2xl transition-shadow">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#102E50]">
            Total Count by Status
          </h2>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data2}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value.toFixed(0)}`}
                  outerRadius={100}
                  // innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  // strokeWidth={3}
                  // stroke="#FFF6E9"
                  animationBegin={0}
                  animationDuration={1000}
                  isAnimationActive={true}
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
            className="group relative overflow-hidden rounded-xl border-2 border-[#D4C5A9] bg-white p-6 shadow-md transition-all hover:shadow-xl hover:border-[#F5C45E] hover:-translate-y-1
                 w-full sm:w-[48%] lg:w-[32%] xl:w-[24%]"
          >
            {/* Status Header */}
            <div className="mb-4 pb-4 border-b-2 border-[#E8DCC8]">
              <h4 className="text-lg font-semibold text-[#102E50] capitalize tracking-tight">
                {status}
              </h4>
            </div>

            {/* Metrics Grid */}
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-[#5A6B7D] font-medium">
                  Orders
                </span>
                <span className="text-2xl font-bold text-[#102E50] tabular-nums">
                  {data.count}
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-sm text-[#5A6B7D] font-medium">
                  Quantity
                </span>
                <span className="text-xl font-semibold text-[#102E50] tabular-nums">
                  {data.totalQuantity}
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-2 border-t border-[#E8DCC8]">
                <span className="text-sm text-[#5A6B7D] font-medium">
                  Total Amount
                </span>
                <span className="text-2xl font-bold text-[#E78B48] tabular-nums">
                  ${data.totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-3 mt-3 border-t border-[#E8DCC8]">
                <span className="text-xs text-[#5A6B7D] font-medium uppercase tracking-wide">
                  Last Order
                </span>
                <span className="text-sm font-medium text-[#102E50] tabular-nums">
                  {data.lastOrder ? formatDateLocal(data.lastOrder) : "—"}
                </span>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-1 bg-[#F5C45E] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersSummary;
