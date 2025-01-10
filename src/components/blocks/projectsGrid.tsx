import { ProjectWithDirectLinks } from "@/types/interfaces";
import { useEffect, useMemo, useState } from "react";
import ProjectCard from "../ui/projectCard";

type ProjectWithAspectRatio = {
  project: ProjectWithDirectLinks;
  aspectRatio: string;
};

export default function ProjectsGrid({
  projects,
}: {
  projects: ProjectWithDirectLinks[];
}) {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth > 1024) {
        setColumns(3);
      } else if (window.innerWidth > 640) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  // Distribute projects across columns to minimize height differences
  const distributeProjects = () => {
    if (columns === 1) {
      return [
        projects.map((project) => ({
          project,
          aspectRatio: "56.25%",
        })),
      ];
    }

    // Initialize columns with empty arrays and running heights
    const columnArrays: ProjectWithAspectRatio[][] = Array(columns)
      .fill(null)
      .map(() => []);
    const columnHeights = Array(columns).fill(0);

    // Process projects one by one
    let projectIndex = 0;
    while (projectIndex < projects.length) {
      const currentProject = projects[projectIndex];
      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      );

      // Find the best aspect ratio for this position
      let bestRatio = "56.25%"; // default to 16:9

      if (columns === 2) {
        if (shortestColumnIndex === 0) {
          bestRatio = columnArrays[0].length % 2 === 0 ? "140%" : "56.25%";
        } else {
          bestRatio = "75%";
        }
      } else if (columns === 3) {
        if (shortestColumnIndex === 0) {
          bestRatio = columnArrays[0].length % 2 === 0 ? "140%" : "56.25%";
        } else if (shortestColumnIndex === 1) {
          bestRatio = "75%";
        } else {
          bestRatio = columnArrays[2].length % 2 === 0 ? "56.25%" : "140%";
        }
      }

      columnArrays[shortestColumnIndex].push({
        project: currentProject,
        aspectRatio: bestRatio,
      });
      columnHeights[shortestColumnIndex] +=
        parseFloat(bestRatio.replace("%", "")) / 100;
      projectIndex++;
    }

    return columnArrays;
  };

  const columnArrays = useMemo(distributeProjects, [projects, columns]);

  return (
    <div className='pt-8 flex flex-col sm:flex-row gap-1 sm:gap-2 lg:gap-4'>
      {columnArrays.map((columnProjects, columnIndex) => (
        <div
          key={columnIndex}
          className='flex-1 flex flex-col gap-1 sm:gap-2 lg:gap-4'
        >
          {columnProjects.map((projectData) => (
            <ProjectCard
              key={projectData.project.id}
              project={projectData.project}
              aspectRatio={projectData.aspectRatio}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
