import { useState } from "react";
import { usePlanner } from "../context/PlannerContext";

function CoursesPage() {
  const {
    courses,
    addToSemester,
    semesterCredits,
    isSemesterLocked,
    MAX_CREDITS_PER_SEM,
    plannedCourses
  } = usePlanner();

  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedSem, setSelectedSem] = useState(1);
  const [search, setSearch] = useState("");

  const semesterNumber = (selectedYear - 1) * 3 + selectedSem;
  const semesterLabel = `Sem ${semesterNumber}`;

  const currentCredits = semesterCredits[semesterLabel] || 0;
  const locked = isSemesterLocked(semesterNumber);

  // 🔥 Collect completed course IDs
  const completedIds = Object.values(plannedCourses)
    .flat()
    .map(c => c.id);

  // 🔍 Search + Semester Filter
  const semesterCourses = courses.filter(
    course =>
      course.semester === semesterNumber &&
      course.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🧠 Recommended Courses (prereq completed)
  const recommendedCourses = semesterCourses.filter(course =>
    course.prereq.every(id => completedIds.includes(id))
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">

      <h2 className="text-3xl font-bold mb-8 text-indigo-600">
        Academic Planner - Smart Planning
      </h2>

      {/* YEAR + SEM SELECT */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="p-2 border rounded-lg shadow"
        >
          {[1,2,3,4].map(year => (
            <option key={year} value={year}>
              Year {year}
            </option>
          ))}
        </select>

        <select
          value={selectedSem}
          onChange={(e) => setSelectedSem(Number(e.target.value))}
          className="p-2 border rounded-lg shadow"
        >
          {[1,2,3].map(sem => (
            <option key={sem} value={sem}>
              Semester {sem}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-lg shadow flex-1"
        />
      </div>

      {/* SEM STATUS */}
      <div className="mb-6">
        {locked ? (
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
            🔒 Semester Locked
          </span>
        ) : (
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
            🟢 Semester Open
          </span>
        )}
      </div>

      {/* CREDIT BAR */}
      <div className="mb-8">
        <p className="text-sm mb-2">
          Credits: {currentCredits} / {MAX_CREDITS_PER_SEM}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              currentCredits >= MAX_CREDITS_PER_SEM
                ? "bg-red-500"
                : "bg-indigo-600"
            }`}
            style={{
              width: `${(currentCredits / MAX_CREDITS_PER_SEM) * 100}%`
            }}
          />
        </div>
      </div>

      {/* 🔥 RECOMMENDED SECTION */}
      {recommendedCourses.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-green-600">
            🎯 Recommended Courses
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {recommendedCourses.map(course => (
              <div
                key={course.id}
                className="bg-green-50 border border-green-200 rounded-xl p-5 shadow"
              >
                <h4 className="font-bold">{course.name}</h4>
                <p className="text-sm text-gray-600">
                  Credits: {course.credits}
                </p>

                <button
                  disabled={locked}
                  onClick={() => addToSemester(semesterLabel, course)}
                  className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Add to Planner
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ALL COURSES */}
      <div className="grid md:grid-cols-2 gap-6">
        {semesterCourses.map(course => {
          const creditFull =
            currentCredits + course.credits > MAX_CREDITS_PER_SEM;

          const prereqMet = course.prereq.every(id =>
            completedIds.includes(id)
          );

          return (
            <div
              key={course.id}
              className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition"
            >
              <h4 className="text-lg font-bold">{course.name}</h4>

              <p className="text-sm text-gray-500 mb-1">
                Credits: {course.credits}
              </p>

              {/* Prerequisite Status */}
              {course.prereq.length > 0 && (
                <p
                  className={`text-xs mb-2 ${
                    prereqMet
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {prereqMet
                    ? "✔ Prerequisite Completed"
                    : "✖ Prerequisite Not Completed"}
                </p>
              )}

              <button
                disabled={locked || creditFull || !prereqMet}
                onClick={() => addToSemester(semesterLabel, course)}
                className={`mt-2 px-4 py-2 rounded-lg text-white transition ${
                  locked || creditFull || !prereqMet
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                Add to Planner
              </button>
            </div>
          );
        })}

        {semesterCourses.length === 0 && (
          <p className="text-gray-500 col-span-2">
            No subjects found.
          </p>
        )}
      </div>
    </div>
  );
}

export default CoursesPage;