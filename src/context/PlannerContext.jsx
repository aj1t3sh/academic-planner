import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

const PlannerContext = createContext();

export const PlannerProvider = ({ children }) => {
  const MAX_CREDITS_PER_SEM = 16;
  const TOTAL_REQUIRED_CREDITS = 184;

  const [courses, setCourses] = useState([]);
  const [plannedCourses, setPlannedCourses] = useState(() => {
    const saved = localStorage.getItem("plannedCourses");
    return saved ? JSON.parse(saved) : {};
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const semesterStructure = {
    "Year 1": ["Sem 1", "Sem 2", "Sem 3"],
    "Year 2": ["Sem 4", "Sem 5", "Sem 6"],
    "Year 3": ["Sem 7", "Sem 8", "Sem 9"],
    "Year 4": ["Sem 10", "Sem 11", "Sem 12"],
  };

  
  useEffect(() => {
    localStorage.setItem("plannedCourses", JSON.stringify(plannedCourses));
  }, [plannedCourses]);

  
  useEffect(() => {
    const dummyCourses = [

      // ================= SEM 1 =================
      { id: 101, code: "MATH-1", name: "Mathematics I", credits: 4, semester: 1, prereq: [] },
      { id: 102, code: "PROG-1", name: "Programming Fundamentals", credits: 4, semester: 1, prereq: [] },
      { id: 103, code: "PHY", name: "Engineering Physics", credits: 3, semester: 1, prereq: [] },
      { id: 104, code: "COMM-1", name: "Communication Skills", credits: 2, semester: 1, prereq: [] },
      { id: 105, code: "WORK-1", name: "Workshop Practice", credits: 3, semester: 1, prereq: [] },

      // ================= SEM 2 =================
      { id: 201, code: "MATH-2", name: "Mathematics II", credits: 4, semester: 2, prereq: [101] },
      { id: 202, code: "DSA", name: "Data Structures", credits: 4, semester: 2, prereq: [102] },
      { id: 203, code: "DDCA", name: "Digital Design & Computer Architecture", credits: 3, semester: 2, prereq: [] },
      { id: 204, code: "ENV", name: "Environmental Studies", credits: 2, semester: 2, prereq: [] },
      { id: 205, code: "PBL-1", name: "PBL Project I", credits: 3, semester: 2, prereq: [] },

      // ================= SEM 3 =================
      { id: 301, code: "OOPS", name: "Object Oriented Programming", credits: 4, semester: 3, prereq: [202] },
      { id: 302, code: "DBMS", name: "Database Systems", credits: 4, semester: 3, prereq: [202] },
      { id: 303, code: "OS", name: "Operating Systems", credits: 4, semester: 3, prereq: [202] },
      { id: 304, code: "WEB", name: "Web Technologies", credits: 3, semester: 3, prereq: [102] },
      { id: 305, code: "PBL-2", name: "PBL Project II", credits: 3, semester: 3, prereq: [205] },

      // ================= SEM 4 =================
      { id: 401, code: "CN", name: "Computer Networks", credits: 4, semester: 4, prereq: [303] },
      { id: 402, code: "SE", name: "Software Engineering", credits: 3, semester: 4, prereq: [301] },
      { id: 403, code: "AI", name: "Artificial Intelligence", credits: 4, semester: 4, prereq: [202] },
      { id: 404, code: "UIUX", name: "UI/UX Engineering", credits: 3, semester: 4, prereq: [304] },
      { id: 405, code: "PBL-3", name: "PBL Project III", credits: 3, semester: 4, prereq: [305] },

      // ================= SEM 5 =================
      { id: 501, code: "ML", name: "Machine Learning", credits: 4, semester: 5, prereq: [403] },
      { id: 502, code: "CLOUD", name: "Cloud Computing", credits: 3, semester: 5, prereq: [401] },
      { id: 503, code: "CYBER", name: "Cyber Security", credits: 3, semester: 5, prereq: [401] },
      { id: 504, code: "DATA-VIS", name: "Data Visualization", credits: 3, semester: 5, prereq: [402] },
      { id: 505, code: "PBL-4", name: "PBL Project IV", credits: 3, semester: 5, prereq: [405] },

      // ================= SEM 6 =================
      { id: 601, code: "DL", name: "Deep Learning", credits: 4, semester: 6, prereq: [501] },
      { id: 602, code: "NLP", name: "Natural Language Processing", credits: 4, semester: 6, prereq: [501] },
      { id: 603, code: "IOT", name: "Internet of Things", credits: 3, semester: 6, prereq: [] },
      { id: 604, code: "BIGDATA", name: "Big Data Analytics", credits: 4, semester: 6, prereq: [501] },
      { id: 605, code: "PBL-5", name: "PBL Project V", credits: 3, semester: 6, prereq: [505] },

      // ================= SEM 7 =================
      { id: 701, code: "GEN-AI", name: "Generative AI", credits: 4, semester: 7, prereq: [601] },
      { id: 702, code: "ADV-ML", name: "Advanced ML Systems", credits: 4, semester: 7, prereq: [601] },
      { id: 703, code: "BLOCKCHAIN", name: "Blockchain Technology", credits: 3, semester: 7, prereq: [] },
      { id: 704, code: "RESEARCH", name: "Research Methodology", credits: 3, semester: 7, prereq: [] },
      { id: 705, code: "PBL-6", name: "PBL Project VI", credits: 3, semester: 7, prereq: [605] },

      // ================= SEM 8 =================
      { id: 801, code: "ROBOTICS", name: "Robotics", credits: 4, semester: 8, prereq: [701] },
      { id: 802, code: "EDGE-AI", name: "Edge AI", credits: 4, semester: 8, prereq: [601] },
      { id: 803, code: "HCI", name: "Human Computer Interaction", credits: 3, semester: 8, prereq: [] },
      { id: 804, code: "SYS-DES", name: "System Design", credits: 4, semester: 8, prereq: [402] },

      // ================= SEM 9 =================
      { id: 901, code: "IND-TRAIN", name: "Industrial Training", credits: 6, semester: 9, prereq: [801] },
      { id: 902, code: "ETHICS", name: "Professional Ethics", credits: 2, semester: 9, prereq: [] },
      { id: 903, code: "ENTR", name: "Entrepreneurship", credits: 2, semester: 9, prereq: [] },

      // ================= SEM 10 =================
      { id: 1001, code: "LLM", name: "Large Language Models", credits: 4, semester: 10, prereq: [701] },
      { id: 1002, code: "ADV-CLOUD", name: "Advanced Cloud Systems", credits: 4, semester: 10, prereq: [502] },

      // ================= SEM 11 =================
      { id: 1101, code: "CAP-1", name: "Capstone Project - 1", credits: 6, semester: 11, prereq: [901] },

      // ================= SEM 12 =================
      { id: 1201, code: "CAP-2", name: "Capstone Project - 2", credits: 6, semester: 12, prereq: [1101] },
    ];

    setCourses(dummyCourses);
  }, []);

  // ===============================
  // Add Course
  // ===============================
  const addToSemester = (semester, course) => {
    setPlannedCourses((prev) => {
      const existing = prev[semester] || [];

      if (existing.some((c) => c.id === course.id)) {
        alert("Course already added.");
        return prev;
      }

      const semesterNumber = parseInt(semester.split(" ")[1]);

      const completedIds = Object.entries(prev)
        .filter(([sem]) => parseInt(sem.split(" ")[1]) < semesterNumber)
        .flatMap(([_, list]) => list)
        .map((c) => c.id);

      const missing = course.prereq.some(
        (id) => !completedIds.includes(id)
      );

      if (missing) {
        alert("Complete prerequisite first.");
        return prev;
      }

      const currentCredits = existing.reduce(
        (sum, c) => sum + c.credits,
        0
      );

      if (currentCredits + course.credits > MAX_CREDITS_PER_SEM) {
        alert("Max 18 credits allowed per semester.");
        return prev;
      }

      return {
        ...prev,
        [semester]: [...existing, course],
      };
    });
  };

  const removeFromSemester = (semester, id) => {
    setPlannedCourses((prev) => ({
      ...prev,
      [semester]: (prev[semester] || []).filter(
        (c) => c.id !== id
      ),
    }));
  };

  const totalCredits = useMemo(() => {
    return Object.values(plannedCourses)
      .flat()
      .reduce((sum, c) => sum + c.credits, 0);
  }, [plannedCourses]);

  const semesterCredits = useMemo(() => {
    const result = {};
    Object.keys(plannedCourses).forEach((sem) => {
      result[sem] = plannedCourses[sem].reduce(
        (sum, c) => sum + c.credits,
        0
      );
    });
    return result;
  }, [plannedCourses]);

  const degreeProgress = useMemo(() => {
  return Math.min(
    Math.round((totalCredits / TOTAL_REQUIRED_CREDITS) * 100),
    100
  );
}, [totalCredits]);

// 🔒 Lock semester if previous not completed
const isSemesterLocked = (semesterNumber) => {
  if (semesterNumber === 1) return false;

  const previousSem = `Sem ${semesterNumber - 1}`;
  return (
    !plannedCourses[previousSem] ||
    plannedCourses[previousSem].length === 0
  );
};


  const isEligibleForGraduation =
    totalCredits >= TOTAL_REQUIRED_CREDITS;

  return (
    <PlannerContext.Provider
      value={{
        courses,
        semesterStructure,
        plannedCourses,
        addToSemester,
        removeFromSemester,
        totalCredits,
        semesterCredits,
        degreeProgress,
        isEligibleForGraduation,
        isSemesterLocked,      
        MAX_CREDITS_PER_SEM,
        loading,
        error,   
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
};

export const usePlanner = () => useContext(PlannerContext);