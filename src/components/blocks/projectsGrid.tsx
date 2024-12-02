import { useEffect, useState } from "react";
import { Project } from "../../../tina/__generated__/types";
import ProjectCard from "../ui/projectCard";

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
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

  const getColumnProjects = (columnIndex: number) => {
    return projects.filter((_, index) => index % columns === columnIndex);
  };

  return (
    <div className='pt-8 lg:pt-12 2xl:pt-16 flex flex-col sm:flex-row gap-1 sm:gap-2 lg:gap-4'>
      {[...Array(columns)].map((_, columnIndex) => (
        <div
          key={columnIndex}
          className='flex-1 flex flex-col gap-1 sm:gap-2 lg:gap-4'
        >
          {getColumnProjects(columnIndex).map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              aspectRatio={getAspectRatio(columns, columnIndex, index)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function getAspectRatio(
  columns: number,
  columnIndex: number,
  index: number
): string {
  if (columns === 1) {
    return "56.25%"; // 16:9
  } else if (columns === 2) {
    if (columnIndex === 0) {
      return index % 2 === 0 ? "140%" : "56.25%"; // 5:7 and 16:9 alternating
    } else {
      return "75%"; // 4:3
    }
  } else {
    if (columnIndex === 0) {
      return index % 2 === 0 ? "140%" : "56.25%"; // 5:7 and 16:9 alternating
    } else if (columnIndex === 1) {
      return "75%"; // 4:3
    } else {
      return index % 2 === 0 ? "56.25%" : "140%"; // 16:9 and 5:7 alternating
    }
  }
}
