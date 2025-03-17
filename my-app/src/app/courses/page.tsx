"use client";
import React, { useEffect, useState } from "react";
import CourseCard from "@/components/courseCard";
import Pagination from "@/components/Pagination";
import Course from "@/interfaces/course";
import { fetchCourses } from "@/api/courses";
import { fetchReviews } from "@/api/review";

const Sources: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState<"all" | "price" | "rating">("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const getCourses = async () => {
        try {
            const [coursesData, reviewsData] = await Promise.all([fetchCourses(), fetchReviews()]);

            const coursesWithRatings = coursesData.map((course: Course) => {
                const courseReviews = reviewsData.filter(
                    (review: any) => review.courseId === course.id && review.rating > 0
                );
                const averageRating =
                    courseReviews.length > 0
                        ? courseReviews.reduce(
                              (sum: number, review: any) => sum + review.rating,
                              0
                          ) / courseReviews.length
                        : 0;

                const roundedRating =
                    courseReviews.length > 0 ? Number(averageRating.toFixed(1)) : 0;
                return { ...course, rating: roundedRating };
            });

            setCourses(coursesWithRatings);
            setFilteredCourses(coursesWithRatings);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCourses();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        filterCourses(e.target.value, filter);
    };

    const handleFilterChange = (newFilter: "all" | "price" | "rating") => {
        setFilter(newFilter);
        filterCourses(searchTerm, newFilter);
    };

    const filterCourses = (search: string, filter: "all" | "price" | "rating") => {
        let filtered = courses.filter((course) =>
            course.title.toLowerCase().includes(search.toLowerCase())
        );
        if (filter === "price") {
            filtered = filtered.sort((a, b) => (a.newPrice || a.price) - (b.newPrice || b.price));
        } else if (filter === "rating") {
            filtered = filtered.sort((a, b) => b.rating - a.rating);
        }
        setFilteredCourses(filtered);
    };

    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
    const displayedCourses = filteredCourses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto">
            {/* Header Section */}
            <div className="flex my-16">
                <div className="w-4/6 pt-12 px-10">
                    <h1 className="font-bold text-3xl">
                        Unlock Your Potential with <br />
                        <span className="text-red-400">Our Language Courses</span>
                    </h1>
                    <p className="text-gray-600 py-12">
                        Explore expertly designed courses tailored to improve your skills in
                        Speaking, Listening, Reading, and Writing. Whether you're a beginner or an
                        advanced learner, our programs help you grow at your own pace.
                    </p>
                    <p className="text-red-300 font-bold text-xl">
                        Start your journey today and achieve your language goals with ease!
                    </p>
                </div>
                <img
                    className="object-cover block w-5/12 pr-24 rounded-lg mb-6"
                    src="/images/course.png"
                    alt=""
                />
            </div>

            {/* Section Title */}
            <div className="flex justify-center text-4xl font-bold text-red-300 pb-24">
                All the skills you need in one place
            </div>

            {/* Filter and Main Content Layout */}
            <div className="flex">
                {/* Sidebar */}
                <div className="w-1/4 p-6">
                    {/* Các bộ lọc khác ... */}
                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-600 mb-2">Ratings</h3>
                        <div className="space-y-2">
                            {[4, 3, 2, 1].map((rating) => (
                                <label
                                    key={rating}
                                    className="block text-gray-600 flex items-center"
                                >
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={rating}
                                        className="mr-2"
                                    />
                                    <div className="flex items-center mr-2">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <img
                                                key={i}
                                                src="/icons/star.png"
                                                alt="star"
                                                className={`w-4 h-4 mr-0.5 ${
                                                    i < rating ? "opacity-100" : "opacity-50"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="flex-grow">{`${rating} & up`}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    {/* Các bộ lọc khác ... */}
                </div>

                {/* Main Content */}
                <div className="w-3/4 p-6">
                    {/* Search Bar and Sort */}
                    <div className="flex justify-between items-center mb-6">
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="border-2 border-gray-300 rounded-lg px-4 py-2 w-1/2"
                        />
                        <div className="mb-6 w-1/4">
                            <h3 className="font-semibold text-gray-600">Sort By</h3>
                            <select
                                value={filter}
                                onChange={(e) =>
                                    handleFilterChange(e.target.value as "all" | "price" | "rating")
                                }
                                className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full"
                            >
                                <option value="all">All</option>
                                <option value="price">Sort by Price</option>
                                <option value="rating">Sort by Rating</option>
                                <option value="popularity">Most Popular</option>
                                <option value="newest">Newest</option>
                            </select>
                        </div>
                    </div>

                    {/* Course Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {displayedCourses.map((course, index) => (
                            <CourseCard key={index} {...course} />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sources;
