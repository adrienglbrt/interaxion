import { ProjectCredits } from "../../../tina/__generated__/types";

export default function ProjectCreditsItem({
  credit,
}: {
  credit: ProjectCredits;
}) {
  return (
    <div className='flex'>
      <p className='w-1/3 text-grey'>{credit?.label}</p>
      {credit?.name !== undefined && credit?.name.length > 1 ? (
        <div className='w-2/3 space-y-2'>
          {credit?.name.map((name, index) => (
            <p key={credit.name[index]}>{name}</p>
          ))}
        </div>
      ) : (
        <p className='w-2/3'>{credit?.name}</p>
      )}
    </div>
  );
}
