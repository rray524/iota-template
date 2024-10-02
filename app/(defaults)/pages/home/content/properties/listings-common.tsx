"use client";
import { Pagination } from "@/components/pagination/pagination";
import SectionTitle from "@/components/section-title/section-title";
import React, { useEffect, useState } from "react";
import { PropertyDetails } from "@/types/property-types";
import useScreenSize from "./hooks";
import { fetchProperties } from "../actions";

export default function CommonListing({
  ItemComponent,
  apiUrl,
  title,
  status,
}: {
  ItemComponent: any;
  apiUrl: string;
  title: string;
  status: string;
}) {
  const [properties, setProperties] = useState<PropertyDetails[]>([]);
  const { width } = useScreenSize();
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = width >= 1280 ? 4 : 3;
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      try {
        const data = await fetchProperties(`?category=${status}`);

        setProperties(data.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);

  const currentItems = properties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <section className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4 my-10">
          <SectionTitle title={title} description="" />
          {loadingData ? (
            <div className="container">
              <div className="flex flex-wrap -mx-4 my-10">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    className={`w-full xl:w-1/4 lg:w-1/3 md:w-1/2 px-4 mb-8`}
                    key={index}
                  >
                    <div key={index} className="border border-gray-200 p-4">
                      <div className="animate-pulse space-y-2">
                        <div className="bg-gray-200 h-48"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-16 bg-gray-200 w-full"></div>
                          <div className="space-x-2 flex">
                            <div className="h-8 bg-gray-200 w-full"></div>
                            <div className="h-8 bg-gray-200 w-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : currentItems.length !== 0 ? (
            currentItems.map((item, index) => (
              <div
                key={index}
                className={`w-full xl:w-1/4 lg:w-1/3 md:w-1/2 px-4 mb-8`}
              >
                <ItemComponent key={index} details={item} index={index} />
              </div>
            ))
          ) : (
            <div className=" max-h-14 container mx-auto">
              <h4 className="text-gray-600 dark:text-gray-100 text-center font-bold">
                No property listed yet!
              </h4>
            </div>
          )}
        </div>
        {currentItems.length !== 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        )}
      </section>
    </>
  );
}
