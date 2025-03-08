"use client";

import React, { useState, useEffect } from "react";
import { fetchPathById } from "@/api/learningPath";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const learningPaths = [
    {
        id: 1,
        title: "Lộ trình cho người mới bắt đầu",
        description: "Bắt đầu với các khái niệm cơ bản và phát triển dần kỹ năng ngôn ngữ.",
        courses: [
            { id: 101, title: "Nhập môn tiếng Anh", url: "/courses/basic-english" },
            { id: 102, title: "Phát âm cơ bản", url: "/courses/pronunciation" },
        ],
    },
    {
        id: 2,
        title: "Lộ trình trung cấp",
        description: "Nâng cao từ vựng và cải thiện kỹ năng giao tiếp.",
        courses: [
            { id: 201, title: "Giao tiếp thực tế", url: "/courses/real-life-conversation" },
            { id: 202, title: "Ngữ pháp nâng cao", url: "/courses/advanced-grammar" },
        ],
    },
    {
        id: 3,
        title: "Lộ trình chuyên sâu",
        description: "Luyện thi chứng chỉ và sử dụng ngôn ngữ chuyên sâu.",
        courses: [
            { id: 301, title: "Luyện thi TOEIC", url: "/courses/toeic-prep" },
            { id: 302, title: "Viết luận chuyên nghiệp", url: "/courses/academic-writing" },
        ],
    },
];

const LearningPath: any = () => {
    const [selectedPath, setSelectedPath] = useState<number | null>(null);
    const [dynamicPaths, setDynamicPaths] = useState<any | null>(null);

    const user = useSelector((state: RootState) => state.user.user);
    if (!user) {
        return alert("Bạn cần đăng nhập.");
    }
    console.log(user);
    const userId = parseInt(user.id);

    useEffect(() => {
        const loadPaths = async () => {
            try {
                const fetchedPaths = await fetchPathById(userId);
                setDynamicPaths(fetchedPaths);
                console.log(dynamicPaths);
            } catch (error) {
                console.error("Error fetching learning paths:", error);
            }
        };
        loadPaths();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-6xl font-bold text-center my-12 text-violet-400">Learning Paths</h1>
            <p className="text-center text-gray-600 mb-6">
                Chọn lộ trình phù hợp với bạn hoặc để AI gợi ý sau này.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {learningPaths.map((path) => (
                    <div
                        key={path.id}
                        className={`border p-6 rounded-lg shadow-md cursor-pointer ${
                            selectedPath === path.id
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200"
                        }`}
                        onClick={() => setSelectedPath(path.id)}
                    >
                        <h2 className="text-xl font-semibold">{path.title}</h2>
                        <p className="text-gray-600">{path.description}</p>
                    </div>
                ))}
            </div>

            {selectedPath !== null && (
                <div className="mt-8 p-6 border rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-center mb-4">
                        Khóa học trong lộ trình
                    </h2>
                    <ul className="space-y-3">
                        {learningPaths
                            .find((path) => path.id === selectedPath)
                            ?.courses.map((course) => (
                                <li
                                    key={course.id}
                                    className="flex justify-between items-center border p-3 rounded-lg"
                                >
                                    <span className="font-medium">{course.title}</span>
                                    <a href={course.url} className="text-blue-500 underline">
                                        Xem khóa học
                                    </a>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
           {dynamicPaths && (
                <div className="mt-8 p-6 border rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-center mb-4">Lộ trình AI</h2>
                    <h3 className="text-xl font-semibold text-center text-blue-600">
                        {/* {dynamicPaths[0]} */}
                    </h3>
                    <p className="text-center text-gray-600 mb-6">
                        Lộ trình cá nhân hóa theo mục tiêu của bạn.
                    </p>

                    {/* {dynamicPaths.stages.map((stage, index) => (
                        <div key={index} className="mb-6 p-4 border rounded-lg bg-gray-50">
                            <h4 className="text-lg font-semibold">
                                {stage.title} ({stage.duration})
                            </h4>
                            <p className="text-gray-600 mb-2">{stage.description}</p>
                            <ul className="list-disc list-inside">
                                {stage.tasks.map((task, taskIndex) => (
                                    <li key={taskIndex} className="text-gray-700">
                                        {task}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))} */}
{/* 
                    <div className="mt-6 p-4 border rounded-lg bg-yellow-50">
                        <h4 className="text-lg font-semibold text-center">
                            {dynamicPaths.finalExam.title}
                        </h4>
                        <p className="text-center text-gray-700">
                            {dynamicPaths.finalExam.description}
                        </p>
                    </div> */}
                </div>
            )} */}
        </div>
    );
};

export default LearningPath;
