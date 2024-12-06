"use client";
import React, { useState, useEffect } from "react";
import DBTable from "@/components/dbTable";
import Course from "@/interfaces/course";
import renderEditModal from "@/components/editModal";

function CoursePage() {
    const template = `{
    "title": "English Foundation Course: Grammar and Speaking Upgrade",
    "description": "Become fluent by improving all your English Skills. Build a strong English foundation in grammar, speaking, and more!",
    "objectives": "Learn in-demand skills from university and industry experts. Master a subject or tool with hands-on projects. Develop a deep understanding of key concepts. Earn a career certificate from Georgia Institute of Technology.",
    "price": 1000,
    "newPrice": 0,
    "thumbnail": "https://res.cloudinary.com/dzbifaqwo/image/upload/v1732779661/samples/dessert-on-a-plate.jpg",
    "categoryId": 2,
    "creatorId": 1,
    "teacherId": 1
}`;
    const [courses, setCourses] = useState<Course[]>([]);
    const [jsonInput, setJsonInput] = useState(template);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const fetchCourses = async () => {
        const response = await fetch("http://localhost:5000/courses");
        const data: Course[] = await response.json();
        setCourses(data);
    };

    const addCourse = async () => {
        const parsedInput = JSON.parse(jsonInput);
        const response = await fetch("http://localhost:5000/courses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(parsedInput),
        });

        if (response.ok) {
            fetchCourses();
            setJsonInput(template);
        } else {
            alert("err");
        }
    };

    const deleteCourse = async (id: number) => {
        const response = await await fetch(
            `http://localhost:5000/courses/${id}`,
            {
                method: "DELETE",
                credentials: "include",
            }
        );
        if (response.ok) fetchCourses();
        else alert("err");
    };

    const editCourse = (course: Course) => {
        setEditingCourse(course);
        setJsonInput(JSON.stringify(course, null, 2));
        setShowEditModal(true);
    };

    const updateCourse = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput);

            if (editingCourse) {
                const response = await fetch(
                    `http://localhost:5000/courses/${editingCourse.id}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(parsedInput),
                        credentials: "include",
                    }
                );

                if (response.ok) {
                    fetchCourses();
                    setEditingCourse(null);
                    setShowEditModal(false);
                    setJsonInput(template);
                } else {
                    alert("Không thể cập nhật.");
                }
            }
        } catch (error) {
            alert("Dữ liệu JSON không hợp lệ.");
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold py-8">Courses management</h1>

            <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="border w-full p-2 h-32"
            ></textarea>
            <div className="my-4">
                <button
                    onClick={addCourse}
                    className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
                >
                    Thêm Course
                </button>
            </div>

            <div className="container">
                <DBTable
                    data={courses}
                    columns={[
                        { key: "id", label: "ID" },
                        { key: "title", label: "Title" },
                        { key: "description", label: "Description" },
                        { key: "price", label: "Price" },
                        { key: "newPrice", label: "New Price" },
                        { key: "teacherId", label: "TeacherId" },
                        { key: "creatorId", label: "CreatorId" },
                        { key: "categoryId", label: "CategoryId" },
                    ]}
                    onEdit={editCourse}
                    onDelete={deleteCourse}
                />
            </div>

            {showEditModal &&
                renderEditModal(
                    jsonInput,
                    setJsonInput,
                    updateCourse,
                    setShowEditModal
                )}
        </div>
    );
}

export default CoursePage;
