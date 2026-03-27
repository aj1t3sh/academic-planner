import { usePlanner } from "../context/PlannerContext";

function PlannerPage() {
  const {
    plannedCourses,
    semesterCredits,
    removeFromSemester,
    isSemesterLocked,
    MAX_CREDITS_PER_SEM,
  } = usePlanner();

  const CURRENT_SEMESTER = 2;

  // 🔹 Calculate CGPA
  const allCourses = Object.values(plannedCourses).flat();
  const totalPoints = allCourses.reduce(
    (sum, c) => sum + (c.grade || 0) * c.credits,
    0
  );
  const totalCredits = allCourses.reduce(
    (sum, c) => sum + c.credits,
    0
  );
  const cgpa = totalCredits
    ? (totalPoints / totalCredits).toFixed(2)
    : "0.00";

  return (
    <div className="p-10 max-w-7xl mx-auto">

      {/* ===== HEADER ===== */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-indigo-600">
          Academic Planner Overview
        </h2>
        <p className="text-gray-500 mt-2">
          CGPA: <span className="font-bold text-lg">{cgpa}</span>
        </p>
      </div>

      {/* ===== TIMELINE VIEW ===== */}
      <div className="flex overflow-x-auto gap-4 mb-12 pb-2">
        {[...Array(12)].map((_, i) => {
          const semName = `Sem ${i + 1}`;
          const credits = semesterCredits[semName] || 0;

          return (
            <div
              key={i}
              className="min-w-[120px] bg-white p-4 rounded-xl shadow text-center"
            >
              <p className="font-bold">{semName}</p>
              <p className="text-sm text-indigo-600">
                {credits} Credits
              </p>
            </div>
          );
        })}
      </div>

      {/* ===== SEMESTER CARDS ===== */}
      {Object.entries(plannedCourses).map(([semester, courses]) => {
        const semNumber = parseInt(semester.split(" ")[1]);
        const locked = isSemesterLocked(semNumber);
        const credits = semesterCredits[semester] || 0;

        // GPA per semester
        const semPoints = courses.reduce(
          (sum, c) => sum + (c.grade || 0) * c.credits,
          0
        );
        const semCredits = courses.reduce(
          (sum, c) => sum + c.credits,
          0
        );
        const semGpa = semCredits
          ? (semPoints / semCredits).toFixed(2)
          : "0.00";

        return (
          <div
            key={semester}
            className={`mb-10 p-6 rounded-xl shadow-md ${
              semNumber === CURRENT_SEMESTER
                ? "bg-indigo-100 border-2 border-indigo-500"
                : "bg-white"
            }`}
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {semester}
              </h3>

              <div className="text-right">
                <p className="text-sm font-semibold">
                  {credits} / {MAX_CREDITS_PER_SEM} Credits
                </p>
                <p className="text-xs text-indigo-600">
                  GPA: {semGpa}
                </p>
              </div>
            </div>

            {/* PROGRESS BAR */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  credits >= MAX_CREDITS_PER_SEM
                    ? "bg-green-500"
                    : "bg-indigo-600"
                }`}
                style={{
                  width: `${(credits / MAX_CREDITS_PER_SEM) * 100}%`
                }}
              />
            </div>

            {/* STATUS */}
            <div className="mb-4">
              {locked ? (
                <span className="text-red-500 text-sm">
                  🔒 Locked
                </span>
              ) : credits >= MAX_CREDITS_PER_SEM ? (
                <span className="text-green-600 text-sm">
                  ✅ Completed
                </span>
              ) : (
                <span className="text-yellow-600 text-sm">
                  🟡 In Progress
                </span>
              )}
            </div>

            {/* COURSE LIST */}
            {courses.map((course) => (
              <div
                key={course.id}
                className="flex justify-between items-center bg-gray-100 p-3 rounded mb-2"
              >
                <div>
                  <p className="font-medium">
                    {course.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {course.credits} Credits
                  </p>
                </div>

                <button
                  onClick={() =>
                    removeFromSemester(semester, course.id)
                  }
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}

            {courses.length === 0 && (
              <p className="text-gray-400 mt-2">
                No courses added yet.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default PlannerPage;