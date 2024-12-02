import React from "react";
import Link from "next/link";

interface CourseCardProps {
    id: number;
    thumbnail: string;
    tag: string;
    title: string;
    description: string;
    price: number;
    newPrice: number;
    rating: number;
}

const CourseCard: React.FC<CourseCardProps> = ({
    id,
    thumbnail,
    tag,
    title,
    description,
    price,
    newPrice,
    rating,
}) => {
    return (
        <Link
            href={`/courses/${id}`}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 max-w-xs"
        >
            <div className="relative">
                <img
                    src={thumbnail}
                    alt={title}
                    className="w-full h-36 object-cover"
                />
            </div>
            <div className="p-4">
                <span className="text-xs text-gray-500 uppercase">{tag}</span>
                <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
                <p className="text-sm text-gray-600 mt-2">{description}</p>
                <div className="flex items-center justify-between mt-4">
                    <div>
                        {/* <p className="text-sm text-gray-500">From</p> */}
                        <p className=" absolute bottom-4 text-lg font-bold text-indigo-600">
                            {price}đ
                        </p>
                    </div>
                    <div className="flex items-center">
                        <p className=" text-sm font-bold text-gray-800 mr-1">
                            {rating}
                        </p>
                        <div className="flex">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <span
                                    key={index}
                                    className={`text-yellow-400 ${
                                        index < rating
                                            ? "text-yellow-400"
                                            : "text-gray-300"
                                    }`}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;
