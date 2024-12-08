const API_BASE_URL = "http://localhost:5000";

export const fetchCourses = async () => {
    const response = await fetch(`${API_BASE_URL}/courses`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Cant get courses.");
    }
    return response.json();
};

export const fetchCourseById = async (id: any) => {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Cant get course.");
    }
    return response.json();
};

export const addCourse = async (parsedInput: object) => {
    const response = await fetch(`${API_BASE_URL}/courses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedInput),
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Cant add course.");
    }
    return response.json();
};

export const deleteCourse = async (id: number) => {
    const response = await await fetch(`${API_BASE_URL}/courses/${id}`, {
        method: "DELETE",
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Cant delete course.");
    }
    return response.json();
};

export const updateCourse = async (parsedInput: object, id: number) => {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedInput),
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Cant update course.");
    }
    return response.json();
};

export const purchaseCourse = async (id: any) => {
    const response = await fetch(`${API_BASE_URL}/courses/${id}/purchase`, {
        method: "POST",
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Cant purchaseCourse.");
    }
    return response.json();
};
