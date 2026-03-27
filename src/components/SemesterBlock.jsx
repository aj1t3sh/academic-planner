function SemesterBlock({ semester, courses, credits, onRemove }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h3 className="text-xl font-semibold text-indigo-600 mb-2">
        {semester}
      </h3>

      <p className="mb-2">Total Credits: {credits}</p>

      {credits > 18 && (
        <p className="text-red-500 text-sm mb-2">
          Credit limit exceeded (Max 18)
        </p>
      )}

      {courses.map(course => (
        <div
          key={course.id}
          className="flex justify-between items-center bg-gray-100 p-3 rounded mt-2"
        >
          <span>
            {course.name} ({course.credits})
          </span>

          <button
            onClick={() => onRemove(course.id)}
            className="text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default SemesterBlock;