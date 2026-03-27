function CourseCard({ course, onAdd, isDisabled }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800">
        {course.name}
      </h3>

      <p className="text-sm text-gray-600 mt-2">
        Credits: {course.credits}
      </p>

      <p className="text-sm text-gray-600">
        Prerequisites: {course.prereq.length === 0 ? "None" : course.prereq.join(", ")}
      </p>

      <button
        disabled={isDisabled}
        onClick={onAdd}
        className={`mt-4 px-4 py-2 rounded-lg transition ${
          isDisabled
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        Add
      </button>
    </div>
  );
}

export default CourseCard;