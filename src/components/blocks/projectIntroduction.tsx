import { Project, ProjectCredits } from "../../../tina/__generated__/types";
import ProjectCreditsItem from "../ui/projectCreditsItem";
import RichText from "../ui/richText";

export default function ProjectIntroduction({ project }: { project: Project }) {
  return (
    <>
      <div className='col-span-6 sm:col-start-2 sm:col-span-4 lg:col-start-7 lg:col-span-5 pt-20 lg:pt-40'>
        <RichText text={project.introduction} />
      </div>
      {project.credits && (
        <div className='col-span-6 sm:col-start-2 sm:col-span-4 lg:col-start-7 lg:col-span-5 pt-10 lg:pt-20 space-y-6'>
          {project.credits
            .filter((credit): credit is ProjectCredits => credit !== null)
            .map((credit) => (
              <ProjectCreditsItem key={credit.label} credit={credit} />
            ))}
        </div>
      )}
    </>
  );
}
