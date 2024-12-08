const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createEnrollment(userId: number, courseId: number) {
    const response = await fetch(`${API_BASE_URL}/enrollment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, courseId }),
    });
    return response.json();
}

export async function getEnrollments(userId: number) {
    const response = await fetch(`${API_BASE_URL}/enrollments/${userId}`);
    return response.json();
}
