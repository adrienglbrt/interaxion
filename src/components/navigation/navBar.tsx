import Wrapper from "../layout/wrapper";
import NavEntry from "./navEntry";

export default function NavBar() {
  return (
    <nav className='fixed bottom-0 h-16 w-full mix-blend-difference text-white z-20'>
      <Wrapper>
        <div className='h-full flex items-center justify-between'>
          <NavEntry href='/'>Interaxion</NavEntry>
          <div className='flex gap-16'>
            <NavEntry href='/work'>Work</NavEntry>
            <NavEntry href='/about'>About</NavEntry>
          </div>
        </div>
      </Wrapper>
    </nav>
  );
}
