import { usePlanner } from "../context/PlannerContext";
import { motion } from "framer-motion";
import { FaGraduationCap, FaChartLine, FaTrophy } from "react-icons/fa";

function SummaryPage() {
  const {
    plannedCourses,
    totalCredits,
    degreeProgress,
    isEligibleForGraduation,
    semesterCredits,
  } = usePlanner();

  const TOTAL_REQUIRED_CREDITS = 184;

  const totalCourses = Object.values(plannedCourses).flat().length;
  const totalSemesters = Object.keys(plannedCourses).length;

  const allCourses = Object.values(plannedCourses).flat();

  const totalPoints = allCourses.reduce(
    (sum, c) => sum + (c.grade || 0) * c.credits,
    0
  );

  const totalCred = allCourses.reduce(
    (sum, c) => sum + c.credits,
    0
  );

  const cgpa = totalCred ? (totalPoints / totalCred).toFixed(2) : "0.00";

  return (
    <div className="p-10 max-w-7xl mx-auto space-y-12">

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-10 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-3 flex items-center gap-3">
          <FaGraduationCap />
          Academic Analytics Dashboard
        </h1>
        <p className="opacity-90 text-lg">
          Real-time performance insights & academic tracking
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

        {[
          { label: "Total Credits", value: totalCredits },
          { label: "CGPA", value: cgpa },
          { label: "Semesters Planned", value: totalSemesters },
          { label: "Total Courses", value: totalCourses },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300 text-center"
          >
            <h3 className="text-gray-500 text-sm mb-2">
              {item.label}
            </h3>
            <p className="text-4xl font-bold text-indigo-600">
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 rounded-full border-8 border-indigo-100"></div>

          <motion.div
            initial={{ strokeDashoffset: 440 }}
            animate={{ strokeDashoffset: 440 - (cgpa / 10) * 440 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <svg width="160" height="160">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="indigo"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="440"
              />
            </svg>
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-indigo-600">
            {cgpa}
          </div>
        </div>
      </div>

      <div className="bg-white p-10 rounded-3xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <FaChartLine />
          Degree Completion Progress
        </h2>

        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${degreeProgress}%` }}
            transition={{ duration: 1 }}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-6 rounded-full"
          />
        </div>

        <p className="mt-4 text-gray-600">
          {degreeProgress}% Completed
        </p>

        {isEligibleForGraduation && (
          <div className="mt-6 bg-green-100 text-green-700 p-4 rounded-xl font-semibold flex items-center gap-2">
            <FaTrophy />
            Congratulations! Eligible for Graduation
          </div>
        )}
      </div>

      <div className="bg-white p-10 rounded-3xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-8">
          Semester Credit Overview
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => {
            const semName = `Sem ${i + 1}`;
            const credits = semesterCredits[semName] || 0;

            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-indigo-50 p-5 rounded-2xl text-center shadow-md"
              >
                <p className="font-semibold">{semName}</p>
                <p className="text-indigo-600 font-bold text-lg">
                  {credits} Credits
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4">
          Smart Insights
        </h2>
        <ul className="space-y-2">
          <li>• Track credit distribution per semester</li>
          <li>• Monitor CGPA performance in real-time</li>
          <li>• Predict graduation eligibility</li>
          <li>• Smart academic analytics system</li>
        </ul>
      </div>

      <div className="text-center">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl shadow-lg transition duration-300"
        >
          Reset Planner
        </button>
      </div>

    </div>
  );
}

export default SummaryPage;